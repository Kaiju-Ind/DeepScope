import type { TechnologyDefinition } from '../../types';

export const dachserTechnologyDefinition = {
	id: "dachser",
	name: "Dachser",
	website: "https://www.dachser.com",
	description: "Dachser is a German freight company.",
	icon: "Dachser.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "dachser:text:0",
			kind: "text",
			pattern: new RegExp("\\bDachser\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
