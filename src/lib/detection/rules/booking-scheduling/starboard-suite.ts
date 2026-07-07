import type { TechnologyDefinition } from '../../types';

export const starboardSuiteTechnologyDefinition = {
	id: "starboard-suite",
	name: "Starboard Suite",
	website: "https://www.starboardsuite.com",
	description: "Starboard Suite is a boat-based booking system that facilitates reservations, scheduling, and customer management for maritime services.",
	icon: "StarboardSuite.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "starboard-suite:dom:0",
			kind: "dom",
			selector: "a[href*='www.starboardsuite.com'] > div#poweredby, form[action*='.starboardsuite.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
