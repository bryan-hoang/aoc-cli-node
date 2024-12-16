import { type ArgsDef, type CommandDef, defineCommand } from 'citty';
import aocCli from '../package.json' assert { type: 'json' };
import { commands } from './commands';
import { sharedArgs } from './commands/_shared';

const args: ArgsDef = {
	...sharedArgs,
	version: {
		type: 'string',
		description: 'Print version information',
	},
} as const;

export const main: CommandDef<typeof args> = defineCommand({
	args,
	meta: {
		name: 'aoc',
		version: aocCli.version,
		description: aocCli.description,
	},
	subCommands: commands,
});
