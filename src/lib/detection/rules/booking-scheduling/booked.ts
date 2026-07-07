import type { TechnologyDefinition } from '../../types';

export const bookedTechnologyDefinition = {
	id: "booked",
	name: "Booked",
	website: "https://www.bookedscheduler.com/",
	description: "Booked is a scheduling solution designed for organizational use.",
	icon: "Booked.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "booked:dom:0",
			kind: "dom",
			selector: "link[href*='css/booked.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:twinkletoessoftware:booked:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
