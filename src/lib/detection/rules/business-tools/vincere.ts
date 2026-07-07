import type { TechnologyDefinition } from '../../types';

export const vincereTechnologyDefinition = {
	id: "vincere",
	name: "Vincere",
	website: "https://www.vincere.io",
	description: "Vincere is an all-in-one software for recruitment agencies.",
	icon: "Vincere.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "vincere:dom:0",
			kind: "dom",
			selector: "link[href*='static.vincere-digital.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
