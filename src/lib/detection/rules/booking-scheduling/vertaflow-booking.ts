import type { TechnologyDefinition } from '../../types';

export const vertaflowBookingTechnologyDefinition = {
	id: "vertaflow-booking",
	name: "VertaFlow Booking",
	website: "https://vertaflow.io",
	description: "VertaFlow Booking is an embeddable appointment-scheduling widget that syncs bookings to VertaFlow CRM.",
	icon: "VertaFlow.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "vertaflow-booking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vertaflow\\.io\\/v1\\/book\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
