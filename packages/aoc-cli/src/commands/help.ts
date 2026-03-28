import { type CommandDef, defineCommand } from "citty";
import { main } from "../main";
import { showUsage } from "../usage";

const help: CommandDef = defineCommand({
	meta: {
		name: "help",
		description: "Print this message or the help of the given subcommand(s)",
	},
	async run(_context) {
		await showUsage(main);
	},
});

export default help;
