import type { TechnologyDefinition } from '../../types';

export const seurTechnologyDefinition = {
	id: "seur",
	name: "SEUR",
	website: "https://www.seur.com",
	description: "SEUR is a Spanish shipments and express transport company.",
	icon: "DPD.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "seur:text:0",
			kind: "text",
			pattern: new RegExp("\\bSEUR\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
