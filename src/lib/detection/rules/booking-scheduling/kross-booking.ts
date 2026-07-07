import type { TechnologyDefinition } from '../../types';

export const krossBookingTechnologyDefinition = {
	id: "kross-booking",
	name: "Kross Booking",
	website: "https://www.krossbooking.com",
	description: "Kross Booking is a booking management system that automates reservations, scheduling, and resource allocation to streamline operational workflows.",
	icon: "KrossBooking.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "kross-booking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("data\\.krossbooking\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
