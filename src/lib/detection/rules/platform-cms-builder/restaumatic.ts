import type { TechnologyDefinition } from '../../types';

export const restaumaticTechnologyDefinition = {
	id: "restaumatic",
	name: "Restaumatic",
	website: "https://www.restaumatic.com",
	description: "Restaumatic is an ecommerce online restaurant ordering system.",
	icon: "Restaumatic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "restaumatic:jsGlobal:0",
			kind: "jsGlobal",
			property: "RestaumaticRegistry",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
