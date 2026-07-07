import type { TechnologyDefinition } from '../../types';

export const glsTechnologyDefinition = {
	id: "gls",
	name: "GLS",
	website: "https://gls-group.eu",
	description: "GLS offers parcel, logistics and express services, throughout Europe as well as in the US and in Canada.",
	icon: "GLS.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "gls:text:0",
			kind: "text",
			pattern: new RegExp("\\bGLS\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
