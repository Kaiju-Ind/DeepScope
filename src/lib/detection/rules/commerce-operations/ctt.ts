import type { TechnologyDefinition } from '../../types';

export const cttTechnologyDefinition = {
	id: "ctt",
	name: "CTT",
	website: "https://www.ctt.pt",
	description: "CTT operates as the national postal service of Portugal.",
	icon: "CTT.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "ctt:text:0",
			kind: "text",
			pattern: new RegExp("\\bTourline Express\\b"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "ctt:text:1",
			kind: "text",
			pattern: new RegExp("\\bCTT\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
