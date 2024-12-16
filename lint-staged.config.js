export default {
	'*': [
		'pnpm run lint --no-errors-on-unmatched --files-ignore-unknown=true --fix --unsafe',
		() => 'pnpm run lint:knip',
	],
	'*.{ts,md}': ['pnpm run build:docs'],
};
