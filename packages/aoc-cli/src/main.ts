import { defineCommand } from 'citty';
import aocCli from '../package.json' assert { type: 'json' };
import { commands } from './commands';
import { sharedArgs } from './commands/_shared';

export const main = defineCommand({
	meta: {
		name: 'aoc',
		version: aocCli.version,
		description: aocCli.description,
	},
	args: {
		...sharedArgs,
		version: {
			alias: 'V',
			type: 'string',
			description: 'Print version information',
		},
	},
	subCommands: commands,
});
