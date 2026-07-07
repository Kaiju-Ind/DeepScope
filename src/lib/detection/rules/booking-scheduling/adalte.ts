import type { TechnologyDefinition } from '../../types';

export const adalteTechnologyDefinition = {
	id: "adalte",
	name: "Adalte",
	website: "https://www.adalte.com",
	description: "Adalte is an online solution designed for travel agencies, tour operators, and DMCs, offering travel management capabilities.",
	icon: "Adalte.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "adalte:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("www\\.adalte\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
