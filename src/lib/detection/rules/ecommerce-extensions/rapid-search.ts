import type { TechnologyDefinition } from '../../types';

export const rapidSearchTechnologyDefinition = {
	id: "rapid-search",
	name: "Rapid Search",
	website: "https://www.rapidsearch.app",
	description: "Rapid Search is an AI-powered Shopify search tool that enhances store conversions through an advanced search bar, product filters, and instant search functionality.",
	icon: "RapidSearch.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "rapid-search:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.rapidsearch\\.dev"),
			description: "Script content contains a bounded technology signature.",
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
