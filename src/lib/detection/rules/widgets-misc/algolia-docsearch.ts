import type { TechnologyDefinition } from '../../types';

export const algoliaDocsearchTechnologyDefinition = {
	id: "algolia-docsearch",
	name: "Algolia DocSearch",
	website: "https://docsearch.algolia.com",
	description: "Algolia DocSearch is a search widget specifically designed for documentation websites.",
	icon: "DocSearch.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "algolia-docsearch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("@docsearch\\/js(?:@([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "algolia-docsearch:jsGlobal:0",
			kind: "jsGlobal",
			property: "docsearch.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia-docsearch:dom:1",
			kind: "dom",
			selector: "link[href*='.algolia.net'][rel='preconnect']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	implies: [
		"algolia",
	],
} as const satisfies TechnologyDefinition;
