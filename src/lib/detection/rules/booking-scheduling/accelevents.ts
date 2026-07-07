import type { TechnologyDefinition } from '../../types';

export const acceleventsTechnologyDefinition = {
	id: "accelevents",
	name: "Accelevents",
	website: "https://www.accelevents.com",
	description: "Accelevents is an enterprise-grade event management software platform that supports planning, hosting, and managing virtual, hybrid, and in-person events.",
	icon: "Accelevents.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "accelevents:dom:0",
			kind: "dom",
			selector: "link[href*='analytics.accelevents.com']",
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
