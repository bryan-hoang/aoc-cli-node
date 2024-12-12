import type { CommandDef } from 'citty';

// biome-ignore lint/suspicious/noExplicitAny: Handling CJS vs ES modules.
const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>;

export const commands = {
	download: () => import('./download').then(_rDefault),
} as const;
