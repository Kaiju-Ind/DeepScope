import type { TechnologyDefinition } from '../../types';

export const makaneTechnologyDefinition = {
	id: "makane",
	name: "Makane",
	website: "https://makane.com",
	description: "Makane is a platform for creating websites and online stores.",
	icon: "Makane.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "makane:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.makane\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
