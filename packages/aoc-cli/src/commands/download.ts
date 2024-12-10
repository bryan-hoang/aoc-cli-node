import { defineCommand } from 'citty';
import { sharedArgs, sharedSetup } from './_shared';
import { debugLog } from '../debug';

export default defineCommand({
	meta: {
		name: 'download',
		description: 'Save puzzle description and input to files',
	},
	args: {
		...sharedArgs,
	},
	setup: sharedSetup,
	async run({ args, data }) {
	},
});
