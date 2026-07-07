import type { TechnologyDefinition } from '../../types';

export const propcartTechnologyDefinition = {
	id: "propcart",
	name: "Propcart",
	website: "https://propcart.com",
	description: "Propcart is an ecommerce software designed for prop houses to manage inventory, showcase items, and handle online rentals or sales.",
	icon: "Propcart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "propcart:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Propcart Pro$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "propcart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^propcart pro$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
