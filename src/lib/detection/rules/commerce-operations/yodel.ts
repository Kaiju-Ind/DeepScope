import type { TechnologyDefinition } from '../../types';

export const yodelTechnologyDefinition = {
	id: "yodel",
	name: "Yodel",
	website: "https://www.yodel.co.uk/",
	description: "Yodel is a delivery company for B2B and B2C orders in the United Kingdom.",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "yodel:text:0",
			kind: "text",
			pattern: new RegExp("\\bYodel\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
