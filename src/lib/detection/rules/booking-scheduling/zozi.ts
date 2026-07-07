import type { TechnologyDefinition } from '../../types';

export const zoziTechnologyDefinition = {
	id: "zozi",
	name: "Zozi",
	website: "https://zozi.com",
	description: "Zozi is a bookings widget and calendar used to manage reservations, availability, and scheduling.",
	icon: "Zozi.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zozi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("a\\.zozi\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
