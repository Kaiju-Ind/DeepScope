import type { TechnologyDefinition } from '../../types';

export const pendoTechnologyDefinition = {
	id: "pendo",
	name: "Pendo",
	website: "https://www.pendo.io",
	description: "Pendo is a product analytics platform used in release to enrich the product experience and provide insights to the product management team.",
	icon: "Pendo.svg",
	categories: [
		"analytics",
		"widgets-misc",
	],
	rules: [
		{
			id: "pendo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pendo\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pendo:jsGlobal:1",
			kind: "jsGlobal",
			property: "pendo.HOST",
			valuePattern: new RegExp("\\.pendo\\.io"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pendo:jsGlobal:2",
			kind: "jsGlobal",
			property: "pendo.VERSION",
			valuePattern: new RegExp("(.+)"),
			confidence: 1,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
