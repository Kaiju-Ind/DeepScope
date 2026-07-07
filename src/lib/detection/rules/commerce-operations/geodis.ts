import type { TechnologyDefinition } from '../../types';

export const geodisTechnologyDefinition = {
	id: "geodis",
	name: "GEODIS",
	website: "https://geodis.com",
	description: "GEODIS is a global transport and logistics company.",
	icon: "GEODIS.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "geodis:text:0",
			kind: "text",
			pattern: new RegExp("\\bGeodis\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
