import type { TechnologyDefinition } from '../../types';

export const vantacaTechnologyDefinition = {
	id: "vantaca",
	name: "Vantaca",
	website: "https://www.vantaca.com/",
	description: "Vantaca is a community management performance software that enables owners, operators, community management teams, accounting teams, and association boards to improve business performance.",
	icon: "Vantaca.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "vantaca:dom:0",
			kind: "dom",
			selector: "link[href*='/style-vantaca_']",
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
