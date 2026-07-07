import type { TechnologyDefinition } from '../../types';

export const adbridgTechnologyDefinition = {
	id: "adbridg",
	name: "AdBridg",
	website: "https://www.adbridg.com",
	description: "AdBridg is a bidding solutions provider for publishers looking to maximize their programmatic revenues.",
	icon: "AdBridg.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adbridg:jsGlobal:0",
			kind: "jsGlobal",
			property: "AdBridg.cmd",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
