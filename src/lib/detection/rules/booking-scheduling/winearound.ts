import type { TechnologyDefinition } from '../../types';

export const winearoundTechnologyDefinition = {
	id: "winearound",
	name: "WINEAROUND",
	website: "https://winearound.com",
	description: "WINEAROUND is a booking software that enables businesses to manage online and offline reservations, schedule appointments, streamline operations, and enhance customer service for guided tours and activities.",
	icon: "WineAround.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "winearound:jsGlobal:0",
			kind: "jsGlobal",
			property: "_winearoundDefaultLanguage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
