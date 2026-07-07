import type { TechnologyDefinition } from '../../types';

export const funbutlerBookingTechnologyDefinition = {
	id: "funbutler-booking",
	name: "Funbutler Booking",
	website: "https://business.funbutler.com",
	description: "Funbutler Booking is a booking and operations system designed for activity centers and entertainment venues to manage reservations and streamline daily operations.",
	icon: "FunbutlerBooking.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "funbutler-booking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("booking\\.funbutler\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "funbutler-booking:jsGlobal:1",
			kind: "jsGlobal",
			property: "funbutlerAPI",
			description: "Page-owned global matches a known technology marker.",
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
