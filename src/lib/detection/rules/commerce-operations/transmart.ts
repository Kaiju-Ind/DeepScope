import type { TechnologyDefinition } from '../../types';

export const transmartTechnologyDefinition = {
	id: "transmart",
	name: "Transmart",
	website: "https://transmartshipping.com",
	description: "Transmart is a shipping company in Turkey.",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "transmart:text:0",
			kind: "text",
			pattern: new RegExp("\\bTransmart\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
