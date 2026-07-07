import type { TechnologyDefinition } from '../../types';

export const clonandoTechnologyDefinition = {
	id: "clonando",
	name: "Clonando",
	website: "https://clonando.com",
	description: "Clonando is a CMS for creating and cloning landing pages without requiring coding knowledge.",
	icon: "Clonando.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "clonando:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Clonando$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "clonando:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^clonando$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
