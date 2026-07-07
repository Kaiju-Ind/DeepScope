import type { TechnologyDefinition } from '../../types';

export const rostiTechnologyDefinition = {
	id: "rosti",
	name: "Rosti",
	website: "https://rosti.cz",
	description: "Rosti is a hosting service suitable for development and production deployment of web applications.",
	icon: "Rosti.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
