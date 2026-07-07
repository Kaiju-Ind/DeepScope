import type { TechnologyDefinition } from '../../types';

export const envialiaTechnologyDefinition = {
	id: "envialia",
	name: "Envialia",
	website: "https://www.envialia.com",
	description: ".",
	icon: "Envialia.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "envialia:text:0",
			kind: "text",
			pattern: new RegExp("\\bEnvialia\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
