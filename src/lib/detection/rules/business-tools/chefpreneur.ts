import type { TechnologyDefinition } from '../../types';

export const chefpreneurTechnologyDefinition = {
	id: "chefpreneur",
	name: "Chefpreneur",
	website: "https://chefpreneur.com",
	description: "Chefpreneur is a platform providing solutions for starting or enhancing personal chef businesses.",
	icon: "Chefpreneur.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "chefpreneur:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.chefpreneur.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
