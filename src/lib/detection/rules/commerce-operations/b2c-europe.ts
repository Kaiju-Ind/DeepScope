import type { TechnologyDefinition } from '../../types';

export const b2cEuropeTechnologyDefinition = {
	id: "b2c-europe",
	name: "B2C Europe",
	website: "https://www.b2ceurope.eu/",
	description: "B2C Europe offers logistic solutions for your ecommerce businesses.",
	icon: "B2C Europe.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "b2c-europe:text:0",
			kind: "text",
			pattern: new RegExp("\\bB2C Europe\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
