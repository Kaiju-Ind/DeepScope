import type { TechnologyDefinition } from '../../types';

export const brtTechnologyDefinition = {
	id: "brt",
	name: "BRT",
	website: "https://www.brt.it",
	description: "BRT, also known as Bartolini, is an Italian-based logistics service provider.",
	icon: "BRT.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "brt:text:0",
			kind: "text",
			pattern: new RegExp("\\bBRT\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
