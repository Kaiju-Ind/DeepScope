import type { TechnologyDefinition } from '../../types';

export const bookingComWidgetTechnologyDefinition = {
	id: "booking-com-widget",
	name: "Booking.com widget",
	website: "https://www.booking.com/affiliate-program/v2/selfmanaged.html",
	description: "Booking.com is one of the largest ecommerce travel companies in the world. As an affiliate member, you can make up to 40% commission.",
	icon: "Booking.com.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "booking-com-widget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("q\\.bstatic\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "booking-com-widget:dom:1",
			kind: "dom",
			selector: "form[action*='.booking.com/'][target='_blank'], img[src*='q-xx.bstatic.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"booking-com",
	],
} as const satisfies TechnologyDefinition;
