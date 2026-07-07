import type { TechnologyDefinition } from '../../types';

export const homerrTechnologyDefinition = {
	id: "homerr",
	name: "Homerr",
	website: "https://www.homerr.com",
	description: "Homerr is a logistics company operating in the Netherlands and Belgium.",
	icon: "Homerr.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "homerr:text:0",
			kind: "text",
			pattern: new RegExp("\\bHomerr\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
