import type { TechnologyDefinition } from '../../types';

export const oreedTechnologyDefinition = {
	id: "oreed",
	name: "Oreed",
	website: "https://oreed.org/en",
	description: "Oreed is an all-in-one learning experience platform, centralizing all organizational learning, training, and development activities.",
	icon: "Oreed.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "oreed:dom:0",
			kind: "dom",
			selector: "body[class*='oreed-lms'], link[href*='.oreed.app/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
