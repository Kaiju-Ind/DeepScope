import type { TechnologyDefinition } from '../../types';

export const weezeventTechnologyDefinition = {
	id: "weezevent",
	name: "Weezevent",
	website: "https://weezevent.com",
	description: "Weezevent is an online ticketing and event management solution that enables organizers to sell tickets, manage registrations, and track attendance for events.",
	icon: "Weezevent.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "weezevent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.weezevent\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
