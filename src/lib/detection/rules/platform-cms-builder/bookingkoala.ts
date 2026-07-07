import type { TechnologyDefinition } from '../../types';

export const bookingkoalaTechnologyDefinition = {
	id: "bookingkoala",
	name: "BookingKoala",
	website: "https://www.bookingkoala.com",
	description: "BookingKoala is a specialized SaaS for service businesses to automate scheduling, quotes, and billing. It features customizable booking forms and provider management tools, ideal for home services like cleaning or landscaping.",
	icon: "BookingKoala.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bookingkoala:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bookingkoala\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
