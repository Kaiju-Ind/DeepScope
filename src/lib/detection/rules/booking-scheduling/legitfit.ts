import type { TechnologyDefinition } from '../../types';

export const legitfitTechnologyDefinition = {
	id: "legitfit",
	name: "LegitFit",
	website: "https://legitfit.com",
	description: "Legitfit is a booking and management platform designed to support scheduling and operations for boutique fitness studios.",
	icon: "LegitFit.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "legitfit:meta:0",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^LegitFit$", "i"),
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
