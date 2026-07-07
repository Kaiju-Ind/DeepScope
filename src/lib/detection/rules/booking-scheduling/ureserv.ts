import type { TechnologyDefinition } from '../../types';

export const ureservTechnologyDefinition = {
	id: "ureserv",
	name: "Ureserv",
	website: "https://ureserv.com",
	description: "Ureserv is an online restaurant reservation and table management system that enables booking, availability tracking, and seating coordination for dining establishments.",
	icon: "Ureserv.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ureserv:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.ureserv.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
