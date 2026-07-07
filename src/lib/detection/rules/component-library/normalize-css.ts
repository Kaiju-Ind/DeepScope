import type { TechnologyDefinition } from '../../types';

export const normalizeCssTechnologyDefinition = {
	id: "normalize-css",
	name: "Normalize.css",
	website: "https://csstools.github.io/normalize.css",
	description: "Normalize.css is a CSS library that makes browsers render elements according to modern standards by targeting only the styles that require normalization.",
	icon: "Normalize.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "normalize-css:dom:0",
			kind: "dom",
			selector: "link[href*='/assets/css/normalize.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
