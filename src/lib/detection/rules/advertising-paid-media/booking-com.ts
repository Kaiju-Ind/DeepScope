import type { TechnologyDefinition } from '../../types';

export const bookingComTechnologyDefinition = {
	id: "booking-com",
	name: "Booking.com",
	website: "https://www.booking.com/affiliate-program/v2/selfmanaged.html",
	description: "Booking.com is one of the largest ecommerce travel companies in the world. As an affiliate member, you can make up to 40% commission.",
	icon: "Booking.com.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "booking-com:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("aff\\.bstatic\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
