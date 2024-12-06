import type { ArgDef } from 'citty';
import envPaths from 'env-paths';
import { join } from 'pathe';

const paths = envPaths('advent-of-code', { suffix: '' });

export const sharedArgs = {
	day: {
		type: 'string',
		description:
			'Puzzle day [default: last unlocked day (during Advent of Code month)]',
	},
	year: {
		type: 'string',
		description:
			'Puzzle year [default: year of current or last Advent of Code event]',
	},
	'session-file': {
		type: 'string',
		description: 'Path to session cookie file',
		default: join(paths.config, 'session-cookie.txt'),
	},
} as const satisfies Record<string, ArgDef>;
