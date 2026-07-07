import type { TechnologyDefinition } from '../../types';

export const verticalBookingTechnologyDefinition = {
	id: "vertical-booking",
	name: "Vertical Booking",
	website: "https://verticalbooking.com",
	description: "Vertical Booking is a central reservation system (CRS) that provides modular tools for managing bookings.",
	icon: "VerticalBooking.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "vertical-booking:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("reservations\\.verticalbooking\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
