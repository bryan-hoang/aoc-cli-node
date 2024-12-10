import { AocClient, AocClientBuilder } from '@bryan-hoang/aoc-client';
import type { ArgDef, CommandContext } from 'citty';
import { debugLog } from '../debug';

export const sharedArgs = {
	day: {
		alias: 'd',
		type: 'string',
		description:
			'Puzzle day [default: last unlocked day (during Advent of Code month)]',
		valueHint: 'DAY',
	},
	year: {
		alias: 'y',
		type: 'string',
		description:
			'Puzzle year [default: year of current or last Advent of Code event]',
		valueHint: 'YEAR',
	},
	'session-file': {
		alias: 's',
		type: 'string',
		description: 'Path to session cookie file',
		default: AocClientBuilder.getDefaultSessionCookieFile(),
		valueHint: 'PATH',
	},
	help: {
		alias: 'h',
		type: 'string',
		description: 'Print help information',
	},
} as const satisfies Record<string, ArgDef>;

export function sharedSetup(context: CommandContext<typeof sharedArgs>) {
	const { args } = context;
	debugLog('Setup args:', args);

	const builder = AocClient.getBuilder();
	if (args['session-file']) {
		builder.getSessionCookieFromFile(args['session-file']);
	} else {
		builder.getSessionCookieFromDefaultLocations();
	}

	const year = Number(args.year);
	const day = Number(args.day);

	if (!Number.isNaN(year) && !Number.isNaN(day)) {
		builder.year(year).day(day);
	} else if (!Number.isNaN(year) && Number.isNaN(day)) {
		builder.year(year).latestPuzzleDay();
	} else if (Number.isNaN(year) && !Number.isNaN(day)) {
		builder.latestEventYear().day(day);
	} else {
		builder.latestPuzzleDay();
	}

	const aocClient = builder.build();
	console.log(context.data);
	context.data = {
		aocClient,
	};
}
