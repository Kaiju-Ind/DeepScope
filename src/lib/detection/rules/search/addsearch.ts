import type { TechnologyDefinition } from '../../types';

export const addsearchTechnologyDefinition = {
	id: "addsearch",
	name: "Addsearch",
	website: "https://www.addsearch.com/",
	description: "Addsearch is a site search solution for small and large websites.",
	icon: "Addsearch.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "addsearch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/addsearch\\.com\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "addsearch:jsGlobal:1",
			kind: "jsGlobal",
			property: "AddSearchClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "addsearch:jsGlobal:2",
			kind: "jsGlobal",
			property: "AddSearchUI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
