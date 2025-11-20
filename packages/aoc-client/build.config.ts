import { type BuildConfig, defineBuildConfig } from 'unbuild';

const config: BuildConfig[] = defineBuildConfig({
	sourcemap: true,
	replace: {
		'import.meta.vitest': 'undefined',
	},
});

export default config;
