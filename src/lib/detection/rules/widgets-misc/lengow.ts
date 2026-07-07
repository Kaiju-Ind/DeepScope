import type { TechnologyDefinition } from '../../types';

export const lengowTechnologyDefinition = {
	id: "lengow",
	name: "Lengow",
	website: "https://www.lengow.com",
	description: "Lengow is an ecommerce automation solution that enables brands and retailers to integrate, structure and optimise their product content across all distribution channels: marketplaces, comparison shopping engines, affiliate platforms, display and retargeting.",
	icon: "Lengow.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lengow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lengow\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
