import type { AocClient } from '@bryan-hoang/aoc-client';
import { type CommandDef, defineCommand } from 'citty';
import { sharedArgs, sharedSetup } from './_shared';

const submitArgs = {
	part: {
		type: 'positional',
		description: 'Puzzle part [possible values: 1, 2]',
	},
	answer: {
		type: 'positional',
		description: 'Puzzle answer',
	},
} as const;

const args: typeof submitArgs & typeof sharedArgs = {
	...submitArgs,
	...sharedArgs,
} as const;

const submit: CommandDef<typeof args> = defineCommand({
	args,
	meta: {
		name: 'submt',
		description: 'Submit puzzle answer',
	},
	setup: sharedSetup,
	async run({ args, data }) {
		const client: AocClient = data.client;
		await client.submitAnswerAndShowOutcome(Number(args.part), args.answer);
	},
});

export default submit;
