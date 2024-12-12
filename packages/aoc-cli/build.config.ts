import { defineBuildConfig } from 'unbuild';
import { purgePolyfills } from 'unplugin-purge-polyfills';

export default defineBuildConfig({
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
	rollup: {
		inlineDependencies: true,
		commonjs: {
			// We transitively depend on `turndown`, which has an 'ES' file that
			// contains a `require`. See
			// https://github.com/mixmark-io/turndown/issues/345 for more info.
			transformMixedEsModules: true,
		},
	},
});
