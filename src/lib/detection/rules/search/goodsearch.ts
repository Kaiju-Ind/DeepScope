import type { TechnologyDefinition } from '../../types';

export const goodsearchTechnologyDefinition = {
	id: "goodsearch",
	name: "Goodsearch",
	website: "https://www.goodsearch.com",
	description: "Goodsearch is a search engine that donates 50 percent of its sponsored search revenue to charities and schools designated by users.",
	icon: "Goodsearch.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "goodsearch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.goodsearch\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
