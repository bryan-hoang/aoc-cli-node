import type { Arg, ArgsDef } from 'citty';
import { toArray } from './_utils';

export function resolveArgs(argsDef: ArgsDef): Arg[] {
	const args: Arg[] = [];
	for (const [name, argDef] of Object.entries(argsDef || {})) {
		args.push({
			...argDef,
			name,
			alias: toArray((argDef as any).alias),
		});
	}
	return args;
}
