import type { TechnologyDefinition } from '../../types';

export const appointeddTechnologyDefinition = {
	id: "appointedd",
	name: "Appointedd",
	website: "https://www.appointedd.com",
	description: "Appointedd is an online booking technology.",
	icon: "Appointedd.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "appointedd:jsGlobal:0",
			kind: "jsGlobal",
			property: "Appointedd",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
