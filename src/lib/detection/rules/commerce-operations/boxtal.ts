import type { TechnologyDefinition } from '../../types';

export const boxtalTechnologyDefinition = {
	id: "boxtal",
	name: "Boxtal",
	website: "https://www.boxtal.com",
	description: "Boxtal is a cloud-based multi-carrier shipping solution.",
	icon: "Boxtal.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "boxtal:text:0",
			kind: "text",
			pattern: new RegExp("\\bBoxtal\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
