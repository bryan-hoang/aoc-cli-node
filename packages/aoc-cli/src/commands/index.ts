import type { CommandDef } from 'citty';

const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>;

export const commands = {
	download: () => import('./download').then(_rDefault),
} as const;
