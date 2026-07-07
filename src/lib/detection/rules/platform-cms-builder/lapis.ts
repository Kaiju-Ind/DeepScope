import type { TechnologyDefinition } from '../../types';

export const lapisTechnologyDefinition = {
	id: "lapis",
	name: "Lapis",
	website: "https://lapissoft.com",
	description: "Lapis is an enterprise ecommerce solutions provider.",
	icon: "Lapis.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lapis:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Lapis$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lapis:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^lapis$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
