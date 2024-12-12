import { AocClient } from '@bryan-hoang/aoc-client';
import { defineCommand } from 'citty';
import consola from 'consola';
import { sharedArgs, sharedSetup } from './_shared';

export default defineCommand({
	meta: {
		name: 'download',
		description: 'Save puzzle description and input to files',
	},
	args: {
		'input-only': {
			alias: 'I',
			type: 'boolean',
			description: 'Download puzzle input only',
		},
		'puzzle-only': {
			alias: 'P',
			type: 'boolean',
			description: 'Download puzzle description only',
		},
		'input-file': {
			alias: 'i',
			type: 'string',
			description: 'Path where to save puzzle input',
			default: 'input',
		},
		'puzzle-file': {
			alias: 'p',
			type: 'string',
			description: 'Path where to save puzzle description',
			default: 'puzzle.md',
		},
		overwrite: {
			alias: 'o',
			type: 'boolean',
			description: 'Overwrite files if they already exist',
			default: false,
		},
		...sharedArgs,
	},
	setup(context) {
		const builder = AocClient.getBuilder();
		builder.overwriteFiles(context.args.overwrite);
		context.data = {
			builder,
		};
		sharedSetup(context);
	},
	async run({ args, data }) {
		const client: AocClient = data.client;
		if (!args['input-only']) {
			client.savePuzzleMarkdown();
			consola.log(`🎅 Saved input to ${args['input-file']}`);
		}

		if (!args['puzzle-only']) {
			client.saveInput();
			consola.log(`🎅 Saved puzzle to ${args['puzzle-file']}`);
		}
	},
});
