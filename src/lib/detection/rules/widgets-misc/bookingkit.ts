import type { TechnologyDefinition } from '../../types';

export const bookingkitTechnologyDefinition = {
	id: "bookingkit",
	name: "Bookingkit",
	website: "https://bookingkit.net/",
	description: "Bookingkit is an online booking management solution. Bookingkit helps its users generate PDF invoices, manage day-to-day scheduling operations, and automatically sync availabilities in real time.",
	icon: "Bookingkit.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookingkit:jsGlobal:0",
			kind: "jsGlobal",
			property: "BookingKitApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
