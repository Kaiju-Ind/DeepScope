import type { TechnologyDefinition } from '../../types';

export const moderTechnologyDefinition = {
	id: "moder",
	name: "Moder",
	website: "https://moder.fi",
	description: "Moder is a PMS system for hotels and resorts to manage and grow their tourism businesses.",
	icon: "Moder.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "moder:jsGlobal:0",
			kind: "jsGlobal",
			property: "Moder.$attrs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moder:jsGlobal:1",
			kind: "jsGlobal",
			property: "ModerSettings.property",
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
