import { defineBuildConfig } from 'unbuild';
import { purgePolyfills } from 'unplugin-purge-polyfills';

export default defineBuildConfig({
	sourcemap: true,
	hooks: {
		'rollup:options'(_, options) {
			const plugins = options.plugins;
			plugins.push(
				purgePolyfills.rollup({
					logLevel: 'verbose',
				}),
			);
		},
	},
	replace: {
		'import.meta.vitest': 'undefined',
	},
});
