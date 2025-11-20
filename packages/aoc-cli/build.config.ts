import { type BuildConfig, defineBuildConfig } from 'unbuild';

const config: BuildConfig[] = defineBuildConfig({
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

export default config;
