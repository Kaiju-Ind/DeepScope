import type { TechnologyDefinition } from '../../types';

export const searchtapTechnologyDefinition = {
	id: "searchtap",
	name: "Searchtap",
	website: "https://searchtap.io",
	description: "Searchtap is a hosted search-as-a-service platform that enables websites to integrate fast and scalable search functionality.",
	icon: "Searchtap.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "searchtap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.searchtap\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "searchtap:dom:1",
			kind: "dom",
			selector: "div[id*='shopify-section-searchtap']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
