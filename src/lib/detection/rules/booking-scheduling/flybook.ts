import type { TechnologyDefinition } from '../../types';

export const flybookTechnologyDefinition = {
	id: "flybook",
	name: "Flybook",
	website: "https://www.theflybook.com",
	description: "Flybook is specialized reservation software designed to manage bookings, availability, and operations for businesses in the adventure, tours, and rentals industry.",
	icon: "Flybook.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "flybook:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^flybook\\-generated\\-session\\-guid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
