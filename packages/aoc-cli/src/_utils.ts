import type { Resolvable } from 'citty';

// biome-ignore lint/suspicious/noExplicitAny: Accurate return type.
export function toArray(val: unknown): any[] {
	if (Array.isArray(val)) {
		return val;
	}
	return typeof val === 'undefined' ? [] : [val];
}

export function formatLineColumns(lines: string[][], linePrefix = ''): string {
	const maxLength: number[] = [];
	for (const line of lines) {
		for (const [i, element] of line.entries()) {
			maxLength[i] = Math.max(maxLength[i] || 0, element.length);
		}
	}
	return lines
		.map((l) =>
			l
				.map((c, i) => `${linePrefix}${c.padEnd(maxLength[i] as number)}`)
				.join('')
				.trimEnd(),
		)
		.join('\n');
}

export function resolveValue<T>(input: Resolvable<T>): T | Promise<T> {
	return typeof input === 'function' ? (input as CallableFunction)() : input;
}
