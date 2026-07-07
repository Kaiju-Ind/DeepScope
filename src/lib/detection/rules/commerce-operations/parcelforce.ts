import type { TechnologyDefinition } from '../../types';

export const parcelforceTechnologyDefinition = {
	id: "parcelforce",
	name: "Parcelforce",
	website: "https://www.parcelforce.com",
	description: "Parcelforce is a courier and logistics service in the United Kingdom.",
	icon: "Parcelforce.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "parcelforce:text:0",
			kind: "text",
			pattern: new RegExp("\\bParcelforce\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
