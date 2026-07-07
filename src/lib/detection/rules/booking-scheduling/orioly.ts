import type { TechnologyDefinition } from '../../types';

export const oriolyTechnologyDefinition = {
	id: "orioly",
	name: "Orioly",
	website: "https://orioly.com",
	description: "Orioly is a booking and management platform for tours and activities that automates scheduling, reservations, and related business processes.",
	icon: "Orioly.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "orioly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("book-now\\.orioly\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "orioly:jsGlobal:1",
			kind: "jsGlobal",
			property: "isOriolyLoaded",
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
