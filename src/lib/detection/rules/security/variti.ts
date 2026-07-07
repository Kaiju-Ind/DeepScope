import type { TechnologyDefinition } from '../../types';

export const varitiTechnologyDefinition = {
	id: "variti",
	name: "Variti",
	website: "https://variti.io",
	description: "Variti is a network security solutions firm that blocks bad bots, protects users from various automated abuse, attacks and fraud techniques.",
	icon: "Variti.png",
	categories: [
		"security",
	],
	rules: [],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
