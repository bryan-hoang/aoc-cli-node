import { runCommand as _runCommand, runMain as _runMain } from 'citty';

import { commands } from './commands';
import { main } from './main';
import { showUsage } from './usage';

export const runMain = () => _runMain(main, { showUsage });

export async function runCommand(
	name: string,
	argv: string[] = process.argv.slice(2),
	data: { overrides?: Record<string, any> } = {},
) {
	if (!(name in commands)) {
		throw new Error(`Invalid command ${name}`);
	}

	return await _runCommand(await commands[name as keyof typeof commands](), {
		rawArgs: argv,
		data: {
			overrides: data.overrides || {},
		},
	});
}
