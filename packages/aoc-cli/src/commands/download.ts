import { existsSync, readFileSync } from 'node:fs';
import { defineCommand } from 'citty';
import consola from 'consola';
import { debugLog } from '../debug';
import { sharedArgs } from './_shared';

export default defineCommand({
	meta: {
		name: 'download',
		description: 'Save puzzle description and input to files',
	},
	args: {
		...sharedArgs,
	},
	setup(context) {
		// Build aoc client based on args.
		context.data = {
			...context.data,
			aocClient: 'foo',
		};
	},
	async run({ args, data }) {
		if (!existsSync(args['session-file'])) {
			consola.error(
				`Session cookie file '${args['session-file']}' could not be found.`,
			);
			process.exit(1);
		}
		const sessionCookie = readFileSync(args['session-file'], {
			encoding: 'utf-8',
		}).trim();
		debugLog('run:', { sessionCookie, data });
	},
});
