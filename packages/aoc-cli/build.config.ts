import type { InputPluginOption } from 'rollup';
import { defineBuildConfig } from 'unbuild';
import { purgePolyfills } from 'unplugin-purge-polyfills';

export default defineBuildConfig({
	declaration: true,
	hooks: {
		'rollup:options'(_, options) {
			const plugins = (options.plugins ||= []) as InputPluginOption[];
			plugins.push(
				purgePolyfills.rollup({
					logLevel: 'verbose',
				}),
			);
		},
	},
	rollup: {
		inlineDependencies: true,
	},
	entries: ['src/index'],
	externals: [],
});
