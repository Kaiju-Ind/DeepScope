import type { TechnologyDefinition } from '../../types';

export const bookingExpertsTechnologyDefinition = {
	id: "booking-experts",
	name: "Booking Experts",
	website: "https://www.bookingexperts.com",
	description: "Booking Experts is an all-in-one reservation management system that integrates booking, availability, and pricing into a single platform.",
	icon: "BookingExperts.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "booking-experts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-cms\\.bookingexperts\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
