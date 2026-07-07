import type { TechnologyDefinition } from '../../types';

export const nostoTechnologyDefinition = {
	id: "nosto",
	name: "Nosto",
	website: "https://www.nosto.com",
	description: "Nosto is an ecommerce platform providing product recommendations based on individual behavioral data.",
	icon: "Nosto.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "nosto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.nosto\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nosto:jsGlobal:1",
			kind: "jsGlobal",
			property: "nosto",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nosto:jsGlobal:2",
			kind: "jsGlobal",
			property: "nostojs",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nosto:meta:3",
			kind: "meta",
			key: "nosto-version",
			valuePattern: new RegExp("([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
