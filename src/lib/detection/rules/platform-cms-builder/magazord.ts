import type { TechnologyDefinition } from '../../types';

export const magazordTechnologyDefinition = {
	id: "magazord",
	name: "Magazord",
	website: "https://www.magazord.com.br",
	description: "Magazord is an all-in-one ecommerce platform.",
	icon: "Magazord.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "magazord:meta:0",
			kind: "meta",
			key: "web-author",
			valuePattern: new RegExp("^Magazord$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "magazord:meta:1",
			kind: "meta",
			key: "web-author",
			valuePattern: new RegExp("^magazord$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
