import type { TechnologyDefinition } from '../../types';

export const oramaTechnologyDefinition = {
	id: "orama",
	name: "Orama",
	website: "https://oramasearch.com",
	description: "Orama is a platform offering full-text and vector search capabilities across 300 global locations.",
	icon: "OramaSearch.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "orama:dom:0",
			kind: "dom",
			selector: "li > a[href*='/@orama/orama'], link[href*='orama-search']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
