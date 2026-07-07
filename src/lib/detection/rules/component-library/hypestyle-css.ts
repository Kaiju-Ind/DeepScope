import type { TechnologyDefinition } from '../../types';

export const hypestyleCssTechnologyDefinition = {
	id: "hypestyle-css",
	name: "Hypestyle CSS",
	website: "https://www.hypestylecss.xyz",
	description: "Hypestyle CSS is a small CSS library build on utility classes and components.",
	icon: "Hypestyle CSS.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "hypestyle-css:dom:0",
			kind: "dom",
			selector: "link[href*='hypestyle']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"sass",
	],
} as const satisfies TechnologyDefinition;
