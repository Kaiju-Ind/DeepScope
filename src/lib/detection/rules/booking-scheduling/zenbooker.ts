import type { TechnologyDefinition } from '../../types';

export const zenbookerTechnologyDefinition = {
	id: "zenbooker",
	name: "Zenbooker",
	website: "https://zenbooker.com",
	description: "Zenbooker is a system that enables users to book appointments or reservations online.",
	icon: "Zenbooker.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zenbooker:jsGlobal:0",
			kind: "jsGlobal",
			property: "Zenbooker.BadgeWidget",
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
