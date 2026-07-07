import type { TechnologyDefinition } from '../../types';

export const yelpReservationsTechnologyDefinition = {
	id: "yelp-reservations",
	name: "Yelp Reservations",
	website: "https://yelp.com",
	description: "Yelp Reservations is a cloud-based restaurant management system.",
	icon: "Yelp.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "yelp-reservations:dom:0",
			kind: "dom",
			selector: "iframe[src*='yelp']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
