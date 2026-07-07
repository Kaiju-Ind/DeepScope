import type { TechnologyDefinition } from '../../types';

export const iterateTechnologyDefinition = {
	id: "iterate",
	name: "Iterate",
	website: "https://iteratehq.com",
	description: "Iterate is a customer insights manager (CIM) system, facilitating website and email surveys to harness customer insights across your entire business.",
	icon: "Iterate.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "iterate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.iteratehq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iterate:jsGlobal:1",
			kind: "jsGlobal",
			property: "Iterate",
			description: "Page-owned global matches a known technology marker.",
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
