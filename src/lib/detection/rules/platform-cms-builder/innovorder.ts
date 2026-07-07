import type { TechnologyDefinition } from '../../types';

export const innovorderTechnologyDefinition = {
	id: "innovorder",
	name: "Innovorder",
	website: "https://www.innovorder.com",
	description: "Innovorder is a point-of-sale solution for restaurateurs that uses AI to support order management and in-store operations.",
	icon: "Innovorder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "innovorder:dom:0",
			kind: "dom",
			selector: "link[href*='static.innovorder.fr/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
