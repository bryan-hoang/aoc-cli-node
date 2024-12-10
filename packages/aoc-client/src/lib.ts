import { readFileSync } from 'node:fs';
import consola from 'consola';
import envPaths from 'env-paths';
import { join } from 'pathe';
import { Temporal } from 'temporal-polyfill';
import { debugLog } from './debug';

const FIRST_EVENT_YEAR = 2015;
const FIRST_PUZZLE_DAY = 1;
const LAST_PUZZLE_DAY = 25;
// See https://adventofcode.com/2024/about#faq_unlocktime
const RELEASE_TIMEZONE_ID = 'America/New_York';
const DECEMBER = 12;

const SESSION_COOKIE_ENV_VAR = 'ADVENT_OF_CODE_SESSION';
const SESSION_COOKIE_FILE = 'session-cookie.txt';

export class AocClient {
	constructor(
		private sessionCookie: string,
		private year: number,
		private day: number,
		private overwriteFiles: boolean,
		private inputFilename: string,
		private puzzleFilename: string,
		private showHtmlMarkup: boolean,
	) {}

	static getBuilder() {
		return new AocClientBuilder();
	}
}

export class AocClientBuilder {
	protected _sessionCookie?: string;
	protected _year?: number;
	protected _day?: number;
	protected _overwriteFiles = false;
	protected _inputFilename = 'input';
	protected _puzzleFilename = 'puzzle.md';
	protected _showHtmlMarkup = false;

	build() {
		this.#validateBuild();
		debugLog('Building client:', {
			sessionCookie: this._sessionCookie,
			year: this._year,
			day: this._day,
			overwriteFile: this._overwriteFiles,
			inputFilename: this._inputFilename,
			puzzleFilenam: this._puzzleFilename,
			showHtmlMarku: this._showHtmlMarkup,
		});
		return new AocClient(
			this._sessionCookie,
			this._year,
			this._day,
			this._overwriteFiles,
			this._inputFilename,
			this._puzzleFilename,
			this._showHtmlMarkup,
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

				return this.setSessionCookie(cookie);
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

	static getDefaultSessionCookieFile() {
		const paths = envPaths('advent-of-code', { suffix: '' });
		return join(paths.config, SESSION_COOKIE_FILE);
	}

	setSessionCookie(sessionCookie: string): AocClientBuilder {
		debugLog({ sessionCookie });
		if (!/^[0-9a-fA-F]+$/.test(sessionCookie)) {
			throw new Error('Invalid session cookie');
		}

		this._sessionCookie = sessionCookie;

		return this;
	}

	year(year: number): AocClientBuilder {
		if (year < FIRST_EVENT_YEAR) {
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
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('AocBuilder', () => {
		const builder = AocClient.getBuilder();
		expect(() => builder.build()).toThrowError(/missing field: _sessionCookie/);
		builder.getSessionCookieFromDefaultLocations();
		expect(() => builder.build()).toThrowError(/missing field: _year/);
		builder.latestPuzzleDay();
		const client = builder.build();
	});
}
