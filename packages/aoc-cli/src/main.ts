import { defineCommand } from 'citty';
import aocCli from '../package.json' assert { type: 'json' };
import { commands } from './commands';

export const main = defineCommand({
	meta: {
		name: 'aoc',
		version: aocCli.version,
		description: aocCli.description,
	},
	args: {
		version: {
			type: 'string',
			description: 'Print version information',
		},
	},
	subCommands: commands,
}) as any;
