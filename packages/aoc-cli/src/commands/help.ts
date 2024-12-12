import { defineCommand } from 'citty';
import { main } from '../main';
import { showUsage } from '../usage';

export default defineCommand({
	meta: {
		name: 'help',
		description: 'Print this message or the help of the given subcommand(s)',
	},
	run(_context) {
		showUsage(main);
	},
});
