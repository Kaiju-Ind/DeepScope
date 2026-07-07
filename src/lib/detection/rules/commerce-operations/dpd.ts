import type { TechnologyDefinition } from '../../types';

export const dpdTechnologyDefinition = {
	id: "dpd",
	name: "DPD",
	website: "https://www.dpd.com",
	description: "DPD is an international parcel delivery service for sorter compatible parcels.",
	icon: "DPD.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "dpd:text:0",
			kind: "text",
			pattern: new RegExp("\\bDPD\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
