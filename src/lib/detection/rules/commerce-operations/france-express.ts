import type { TechnologyDefinition } from '../../types';

export const franceExpressTechnologyDefinition = {
	id: "france-express",
	name: "France Express",
	website: "https://www.france-express.com",
	description: "France Express is a delivery service based in France.",
	icon: "France Express.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "france-express:text:0",
			kind: "text",
			pattern: new RegExp("\\bFrance Express\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
