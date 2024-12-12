import { AocClient, AocClientBuilder } from '@bryan-hoang/aoc-client';
import type { ArgsDef, CommandContext, ParsedArgs } from 'citty';
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
} as const satisfies ArgsDef;

export function sharedSetup<TSharedArgs extends ArgsDef = ArgsDef>(
	context: CommandContext<TSharedArgs>,
) {
	// Shared setup should always use the same shared arguments.
	const args = context.args as ParsedArgs<typeof sharedArgs>;
	debugLog('Setup args:', args);

	const builder: AocClientBuilder =
		context.data?.builder ?? AocClient.getBuilder();
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

	const client = builder.buildClient();
	context.data = {
		client,
	};
}
