import type { TechnologyDefinition } from '../../types';

export const mrwTechnologyDefinition = {
	id: "mrw",
	name: "MRW",
	website: "https://www.mrw.es",
	description: "MRW is a Spanish courier company specialised in express national and international shipping services.",
	icon: "MRW.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mrw:text:0",
			kind: "text",
			pattern: new RegExp("\\bMRW\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
