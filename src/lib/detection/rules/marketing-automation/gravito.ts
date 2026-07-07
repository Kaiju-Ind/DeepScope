import type { TechnologyDefinition } from '../../types';

export const gravitoTechnologyDefinition = {
	id: "gravito",
	name: "Gravito",
	website: "https://www.gravito.net",
	description: "Gravito is a service that enables centralized consumer consent and the collection of observed data from multiple digital touchpoints, securely integrating it with personal data.",
	icon: "Gravito.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "gravito:jsGlobal:0",
			kind: "jsGlobal",
			property: "gravito.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gravito:jsGlobal:1",
			kind: "jsGlobal",
			property: "gravitoCMP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gravito:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^gravitoSync$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "gravito:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^gravitosync$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
