import type { TechnologyDefinition } from '../../types';

export const nookalTechnologyDefinition = {
	id: "nookal",
	name: "Nookal",
	website: "https://www.nookal.com",
	description: "Nookal is a practice management software that organizes and manages medical appointments.",
	icon: "Nookal.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "nookal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("nookal\\.bookings\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nookal:jsGlobal:1",
			kind: "jsGlobal",
			property: "nookal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nookal:header:2",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("bookings\\.nookal\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nookal:header:3",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("bookings\\.nookal\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
