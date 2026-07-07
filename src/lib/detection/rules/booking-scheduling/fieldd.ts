import type { TechnologyDefinition } from '../../types';

export const fielddTechnologyDefinition = {
	id: "fieldd",
	name: "Fieldd",
	website: "https://fieldd.co",
	description: "Fieldd is a scheduling software used to plan, assign, and manage field service operations.",
	icon: "Fieldd.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "fieldd:jsGlobal:0",
			kind: "jsGlobal",
			property: "FielddBooking.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fieldd:jsGlobal:1",
			kind: "jsGlobal",
			property: "FielddLeadForm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
