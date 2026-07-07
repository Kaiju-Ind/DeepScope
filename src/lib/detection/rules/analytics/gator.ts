import type { TechnologyDefinition } from '../../types';

export const gatorTechnologyDefinition = {
	id: "gator",
	name: "Gator",
	website: "https://gator.io",
	description: "Gator is a platform that enables realtime user data collection, profiling and aggregation.",
	icon: "Gator.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "gator:jsGlobal:0",
			kind: "jsGlobal",
			property: "GatorLegacy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
