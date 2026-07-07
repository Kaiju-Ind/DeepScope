import type { TechnologyDefinition } from '../../types';

export const foratableTechnologyDefinition = {
	id: "foratable",
	name: "Foratable",
	website: "https://go.foratable.com",
	description: "Foratable is a reservation system for restaurants that manages table bookings, customer scheduling, and availability tracking.",
	icon: "Foratable.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "foratable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.foratable\\.com"),
			description: "Script source URL matches a known technology marker.",
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
