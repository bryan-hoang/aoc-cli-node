import type { CommandDef } from 'citty';

// biome-ignore lint/suspicious/noExplicitAny: Handling CJS vs ES modules.
const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>;

export const commands = {
	submit: (): Promise<CommandDef> => import('./submit').then(_rDefault),
	download: (): Promise<CommandDef> => import('./download').then(_rDefault),
	help: (): Promise<CommandDef> => import('./help').then(_rDefault),
} as const;
