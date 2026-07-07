import type { TechnologyDefinition } from '../../types';

export const searchaniseTechnologyDefinition = {
	id: "searchanise",
	name: "Searchanise",
	website: "https://start.searchanise.com",
	description: "Searchanise is a complete search and filter solution for ecommerce.",
	icon: "Searchanise.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "searchanise:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("searchanise(?:-.+\\.kxcdn)?\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "searchanise:jsGlobal:1",
			kind: "jsGlobal",
			property: "Searchanise",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
