import type { TechnologyDefinition } from '../../types';

export const planneTechnologyDefinition = {
	id: "planne",
	name: "Planne",
	website: "https://www.planne.com.br",
	description: "Planne is a ticketing and booking reservation system.",
	icon: "Planne.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "planne:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Planne$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "planne:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^planne$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
