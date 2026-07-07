import type { TechnologyDefinition } from '../../types';

export const glofoxTechnologyDefinition = {
	id: "glofox",
	name: "Glofox",
	website: "https://www.glofox.com",
	description: "Glofox is a fitness management platform that assists gyms and fitness studios in managing memberships, class scheduling, and other business operations.",
	icon: "Glofox.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "glofox:dom:0",
			kind: "dom",
			selector: "a[href*='.glofox.com/'], iframe[src*='.glofox.com/']",
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
