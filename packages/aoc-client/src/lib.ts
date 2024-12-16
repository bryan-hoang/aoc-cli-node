import { readFileSync, writeFileSync } from 'node:fs';
import consola from 'consola';
import { serialize as serializeCookie } from 'cookie-es';
import defu from 'defu';
import envPaths from 'env-paths';
import { type FetchOptions, ofetch } from 'ofetch';
import { join } from 'pathe';
import { Temporal } from 'temporal-polyfill';
import TurndownService from 'turndown';
import { createRegExp } from 'type-level-regexp';
import aocClient from '../package.json' assert { type: 'json' };
import { debugLog } from './debug';

const FIRST_EVENT_YEAR = 2015;
const FIRST_PUZZLE_DAY = 1;
const LAST_PUZZLE_DAY = 25;
// See https://adventofcode.com/2024/about#faq_unlocktime
const RELEASE_TIMEZONE_ID = 'America/New_York';
const DECEMBER = 12;

const SESSION_COOKIE_ENV_VAR = 'ADVENT_OF_CODE_SESSION';
const SESSION_COOKIE_FILE = 'session-cookie.txt';

const MAIN_REGEXP = createRegExp('<main>(?<main>.*)</main>', ['i', 's']);

export class AocClientBuilder {
	protected _sessionCookie?: string;
	protected _year?: number;
	protected _day?: number;
	protected _overwriteFiles = false;
	protected _inputFilename = 'input';
	protected _puzzleFilename = 'puzzle.md';

	buildClient(): AocClient {
		this.#validateBuild();
		const localDateTime = new Temporal.PlainDate(
			this._year,
			DECEMBER,
			this._day,
		);
		const unlockDateTime = localDateTime.toZonedDateTime(RELEASE_TIMEZONE_ID);
		debugLog('Building client:', {
			sessionCookie: this._sessionCookie,
			unlockDateTime: String(unlockDateTime),
			year: this._year,
			day: this._day,
			overwriteFiles: this._overwriteFiles,
			inputFilename: this._inputFilename,
			puzzleFilename: this._puzzleFilename,
		});
		return new AocClient(
			this._sessionCookie,
			unlockDateTime,
			this._year,
			this._day,
			this._overwriteFiles,
			this._inputFilename,
			this._puzzleFilename,
		);
	}

	#validateBuild(): asserts this is this & {
		_sessionCookie: string;
		_year: number;
		_day: number;
	} {
		for (const field of ['_sessionCookie', '_year', '_day'] as const) {
			if (typeof this[field] === 'undefined') {
				throw new Error(
					`Failed to create client due to missing field: ${field}`,
				);
			}
		}
	}

	getSessionCookieFromDefaultLocations(): AocClientBuilder {
		const cookie = process.env[SESSION_COOKIE_ENV_VAR];
		if (typeof cookie === 'string') {
			if (cookie !== '') {
				debugLog(
					`🍪 Loading session cookie from '${SESSION_COOKIE_ENV_VAR}' environment variable`,
				);

				return this.sessionCookie(cookie);
			}

			consola.warn(
				`🍪 Environment variable '${SESSION_COOKIE_ENV_VAR} is set but it is empty, ignoring`,
			);
		}

		return this.getSessionCookieFromFile(
			AocClientBuilder.getDefaultSessionCookieFile(),
		);
	}

	getSessionCookieFromFile(file: string): AocClientBuilder {
		debugLog(`🍪 Loading session cookie from ${file}`);
		try {
			this._sessionCookie = readFileSync(file, { encoding: 'utf-8' }).trim();
		} catch (error) {
			throw new Error(`Failed to read session cookie from ${file}`, {
				cause: error,
			});
		}
		return this;
	}

	static getDefaultSessionCookieFile(): string {
		const paths = envPaths('advent-of-code', { suffix: '' });
		return join(paths.config, SESSION_COOKIE_FILE);
	}

	sessionCookie(sessionCookie: string): AocClientBuilder {
		debugLog({ sessionCookie });
		if (!/^[0-9a-fA-F]+$/.test(sessionCookie)) {
			throw new Error('Invalid session cookie');
		}

		this._sessionCookie = sessionCookie;

		return this;
	}

	year(year: number): AocClientBuilder {
		if (year < FIRST_EVENT_YEAR || !Number.isInteger(year)) {
			throw new Error(`${year} is not a valid Advent of Code year`);
		}

		this._year = year;
		return this;
	}

	day(day: number): AocClientBuilder {
		if (
			!Array(LAST_PUZZLE_DAY)
				.fill(0)
				.map((_, i) => i + FIRST_PUZZLE_DAY)
				.includes(day)
		) {
			throw new Error(`${day} is not a valid Advent of Code day`);
		}

		this._day = day;
		return this;
	}

	latestPuzzleDay(): AocClientBuilder {
		if (typeof this._year === 'undefined') {
			this.latestEventYear();
		}

		const eventYear = this._year;
		const now = Temporal.Now.zonedDateTimeISO(RELEASE_TIMEZONE_ID);

		if (now.year === eventYear && now.month === DECEMBER) {
			if (now.day < LAST_PUZZLE_DAY) {
				return this.day(now.day);
			}
			return this.day(LAST_PUZZLE_DAY);
		}
		if (now.year < (eventYear as number)) {
			return this.day(LAST_PUZZLE_DAY);
		}
		return this.day(FIRST_PUZZLE_DAY);
	}

	latestEventYear(): AocClientBuilder {
		const now = Temporal.Now.zonedDateTimeISO(RELEASE_TIMEZONE_ID);

		let year: number;
		if (now.month < DECEMBER) {
			year = now.year - 1;
		} else {
			year = now.year;
		}

		return this.year(year);
	}

	overwriteFiles(overwriteFiles: boolean): AocClientBuilder {
		this._overwriteFiles = overwriteFiles;
		return this;
	}
}

export class AocClient {
	constructor(
		private sessionCookie: string,
		private unlockDateTime: Temporal.ZonedDateTime,
		private year: number,
		private day: number,
		private overwriteFiles: boolean,
		private inputFilename: string,
		private puzzleFilename: string,
	) {}

	static getBuilder(): AocClientBuilder {
		return new AocClientBuilder();
	}

	async savePuzzleMarkdown(): Promise<void> {
		const puzzleHtml = await this.getPuzzleHtml();
		const turndownService = new TurndownService({
			codeBlockStyle: 'fenced',
			bulletListMarker: '*',
			emDelimiter: '*',
		});
		turndownService.escape = (content) => content;
		const puzzleMd = turndownService.turndown(puzzleHtml);
		saveFile({
			path: this.puzzleFilename,
			contents: puzzleMd,
			overwrite: this.overwriteFiles,
		});
	}

	async saveInput(): Promise<void> {
		const input = await this.getInput();
		saveFile({
			path: this.inputFilename,
			contents: input,
			overwrite: this.overwriteFiles,
		});
	}

	async getPuzzleHtml(): Promise<string> {
		this.ensureDayUnlocked();

		debugLog(`🦌 Fetching puzzle for day ${this.day}, ${this.year}`);

		const response = await this.fetch(`/${this.year}/day/${this.day}`);
		const puzzleHtml = response.match(MAIN_REGEXP)?.groups.main;
		return puzzleHtml as string;
	}

	async getInput(): Promise<string> {
		this.ensureDayUnlocked();

		debugLog(`🦌 Fetching input for day ${this.day}, ${this.year}`);

		const response = await this.fetch(`/${this.year}/day/${this.day}/input`);

		return response;
	}

	ensureDayUnlocked(): void {
		if (!this.isDayUnlocked()) {
			throw new Error(`Puzzle ${this.day} of ${this.year} is still locked`);
		}
	}

	isDayUnlocked(): boolean {
		const now = Temporal.Now.zonedDateTimeISO(RELEASE_TIMEZONE_ID);
		return now.since(this.unlockDateTime).milliseconds > 0;
	}

	async submitAnswerAndShowOutcome(
		puzzlePart: number,
		answer: string,
	): Promise<void> {
		const outcomeHtml = await this.submitAnswerHtml(puzzlePart, answer);
		const turndownService = new TurndownService();
		turndownService.escape = (content) => content;
		consola.log(turndownService.turndown(outcomeHtml));
	}

	async submitAnswerHtml(puzzlePart: number, answer: string): Promise<string> {
		this.ensureDayUnlocked();

		debugLog(
			`🦌 Submitting answer for part ${puzzlePart}, day ${this.day}, ${this.year}`,
		);

		const response = await this.fetch(`/${this.year}/day/${this.day}/answer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				answer,
				level: String(puzzlePart),
			}),
		});
		const mainHtml = String(response.match(MAIN_REGEXP)?.groups.main);
		return mainHtml;
	}

	async fetch(
		pathname: string,
		options?: FetchOptions<'text'>,
	): Promise<string> {
		const defaultOptions: FetchOptions<'text'> = {
			baseURL: 'https://adventofcode.com/',
			headers: {
				Cookie: serializeCookie('session', this.sessionCookie),
				'User-Agent': `${aocClient.name.replaceAll('/', '-')}/${
					aocClient.version
				}`,
			},
		};

		debugLog('fetch options:', defu(options, defaultOptions));

		return ofetch<string, 'text'>(pathname, defu(options, defaultOptions));
	}
}
function saveFile(options: {
	path: string;
	contents: string;
	overwrite: boolean;
}) {
	const { path, contents, overwrite } = options;
	writeFileSync(path, contents, {
		flag: `w${overwrite ? '' : 'x'}`,
	});
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('AocBuilder', async () => {
		const builder = AocClient.getBuilder();
		expect(() => builder.buildClient()).toThrowError(
			/missing field: _sessionCookie/,
		);
		builder.getSessionCookieFromDefaultLocations();
		expect(() => builder.buildClient()).toThrowError(/missing field: _year/);
		builder.latestPuzzleDay();
		const client = builder.buildClient();
		await client.submitAnswerAndShowOutcome(1, '42');
	});
}
