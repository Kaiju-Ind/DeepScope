import type { TechnologyDefinition } from '../../types';

export const reservioTechnologyDefinition = {
	id: "reservio",
	name: "Reservio",
	website: "https://www.reservio.com",
	description: "Reservio is a cloud-based appointment scheduling and online booking solution.",
	icon: "Reservio.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "reservio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.reservio\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reservio:dom:1",
			kind: "dom",
			selector: ".reservio-booking-button",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "reservio:dom:2",
			kind: "dom",
			selector: "a[href*='.reservio.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "reservio:dom:3",
			kind: "dom",
			selector: "a[href*='bookings.reservio.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
