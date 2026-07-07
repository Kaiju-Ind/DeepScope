import type { TechnologyDefinition } from '../../types';

export const redJePakketjeTechnologyDefinition = {
	id: "red-je-pakketje",
	name: "Red je Pakketje",
	website: "https://redjepakketje.nl",
	description: "Red je Pakketje is a Dutch company specialised in same-day-delivery.",
	icon: "Red je Pakketje.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "red-je-pakketje:text:0",
			kind: "text",
			pattern: new RegExp("\\bRed je Pakketje\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
