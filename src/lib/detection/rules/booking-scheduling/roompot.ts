import type { TechnologyDefinition } from '../../types';

export const roompotTechnologyDefinition = {
	id: "roompot",
	name: "Roompot",
	website: "https://www.roompot.com",
	description: "Roompot is a provider of holiday parks, specialising in the management and operation of parks and campsites.",
	icon: "Roompot.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "roompot:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.roompot.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
