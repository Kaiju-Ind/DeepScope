import type { TechnologyDefinition } from '../../types';

export const vivenuTechnologyDefinition = {
	id: "vivenu",
	name: "Vivenu",
	website: "https://vivenu.com",
	description: "Vivenu is a ticketing platform.",
	icon: "Vivenu.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vivenu:dom:0",
			kind: "dom",
			selector: "title#vivenuId",
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
