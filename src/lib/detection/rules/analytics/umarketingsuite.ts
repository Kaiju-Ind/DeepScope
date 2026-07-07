import type { TechnologyDefinition } from '../../types';

export const umarketingsuiteTechnologyDefinition = {
	id: "umarketingsuite",
	name: "uMarketingSuite",
	website: "https://www.umarketingsuite.com",
	description: "uMarketingSuite is a set of diverse features that together form a full marketing suite for the Umbraco platform.",
	icon: "uMarketingSuite.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "umarketingsuite:jsGlobal:0",
			kind: "jsGlobal",
			property: "uMarketingSuite",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"umbraco",
	],
} as const satisfies TechnologyDefinition;
