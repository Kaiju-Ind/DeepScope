import type { TechnologyDefinition } from '../../types';

export const rspackTechnologyDefinition = {
	id: "rspack",
	name: "Rspack",
	website: "https://www.rspack.dev",
	description: "Rspack is a JavaScript bundler written in Rust, offering faster build times and compatibility with the Webpack ecosystem​.",
	icon: "Rspack.svg",
	categories: [
		"widgets-misc",
	],
	rules: [],
	metadata: {
		oss: true,
	},
	implies: [
		"rust",
	],
} as const satisfies TechnologyDefinition;
