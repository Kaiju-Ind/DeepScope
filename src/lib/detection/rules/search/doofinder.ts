import type { TechnologyDefinition } from '../../types';

export const doofinderTechnologyDefinition = {
	id: "doofinder",
	name: "Doofinder",
	website: "https://www.doofinder.com",
	description: "Doofinder is a search site solution that enables users to include advanced and smart search engine capabilities in their ecommerce website.",
	icon: "Doofinder.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "doofinder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.doofinder\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doofinder:jsGlobal:1",
			kind: "jsGlobal",
			property: "doofinder.classic.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
