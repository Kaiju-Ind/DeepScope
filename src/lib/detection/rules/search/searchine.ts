import type { TechnologyDefinition } from '../../types';

export const searchineTechnologyDefinition = {
	id: "searchine",
	name: "Searchine",
	website: "https://www.searchine.net",
	description: "Searchine is a site search system that provides insights into visitor search behaviour and offers suggestions for website improvements.",
	icon: "Searchine.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "searchine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.searchine\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
