import type { TechnologyDefinition } from '../../types';

export const tipsaTechnologyDefinition = {
	id: "tipsa",
	name: "Tipsa",
	website: "https://www.tip-sa.com",
	description: "TIPSA is a parcel delivery company in Spain, Portugal and Andorra.",
	icon: "Tipsa.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "tipsa:text:0",
			kind: "text",
			pattern: new RegExp("\\bTipsa\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
