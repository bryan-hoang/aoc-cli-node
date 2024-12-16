import { type BuildConfig, defineBuildConfig } from 'unbuild';
import { purgePolyfills } from 'unplugin-purge-polyfills';

const config: BuildConfig[] = defineBuildConfig({
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

export default config;
