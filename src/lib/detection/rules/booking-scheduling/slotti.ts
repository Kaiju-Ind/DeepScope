import type { TechnologyDefinition } from '../../types';

export const slottiTechnologyDefinition = {
	id: "slotti",
	name: "Slotti",
	website: "https://slotti.fi",
	description: "Slotti is a cloud-based appointment booking and checkout system tailored for service companies.",
	icon: "Slotti.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "slotti:jsGlobal:0",
			kind: "jsGlobal",
			property: "Slotti",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
