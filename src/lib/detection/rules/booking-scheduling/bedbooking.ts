import type { TechnologyDefinition } from '../../types';

export const bedbookingTechnologyDefinition = {
	id: "bedbooking",
	name: "BedBooking",
	website: "https://bed-booking.com",
	description: "BedBooking is an all-in-one software platform designed to manage short-term and vacation rental operations, including reservations.",
	icon: "BedBooking.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bedbooking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("panel\\.bed-booking\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bedbooking:jsGlobal:1",
			kind: "jsGlobal",
			property: "bedbookingAsyncInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
