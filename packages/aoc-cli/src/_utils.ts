import type { Resolvable } from 'citty';

export function toArray(val: unknown) {
	if (Array.isArray(val)) {
		return val;
	}
	return typeof val === 'undefined' ? [] : [val];
}

export function formatLineColumns(lines: string[][], linePrefix = '') {
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
				.join(''),
		)
		.join('\n');
}

export function resolveValue<T>(input: Resolvable<T>): T | Promise<T> {
	return typeof input === 'function' ? (input as CallableFunction)() : input;
}
