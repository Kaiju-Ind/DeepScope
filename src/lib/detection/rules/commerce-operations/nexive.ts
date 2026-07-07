import type { TechnologyDefinition } from '../../types';

export const nexiveTechnologyDefinition = {
	id: "nexive",
	name: "Nexive",
	website: "https://www.nexive.it",
	description: "Nexive is a postal operator in Italy.",
	icon: "Nexive.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "nexive:text:0",
			kind: "text",
			pattern: new RegExp("\\bNexive\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
