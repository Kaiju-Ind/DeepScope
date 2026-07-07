import type { TechnologyDefinition } from '../../types';

export const gbookingTechnologyDefinition = {
	id: "gbooking",
	name: "GBooking",
	website: "https://gbooking.ru",
	description: "GBooking is an online platform that provides booking and business management services for scheduling, reservations, and operational organization.",
	icon: "GBooking.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "gbooking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.gbooking\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
