import type { TechnologyDefinition } from '../../types';

export const bpostTechnologyDefinition = {
	id: "bpost",
	name: "Bpost",
	website: "https://www.bpost.be",
	description: "Bpost, also known as the Belgian Post Group, is the Belgian company responsible for the delivery of national and international mail.",
	icon: "Bpost.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bpost:text:0",
			kind: "text",
			pattern: new RegExp("\\bBpost\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
