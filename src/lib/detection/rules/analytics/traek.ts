import type { TechnologyDefinition } from '../../types';

export const traekTechnologyDefinition = {
	id: "traek",
	name: "Traek",
	website: "https://www.traek.io",
	description: "Traek is a website insights, analytics and lead generation tool.",
	icon: "Traek.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "traek:jsGlobal:0",
			kind: "jsGlobal",
			property: "Traek",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
