import type { TechnologyDefinition } from '../../types';

export const betterCartTechnologyDefinition = {
	id: "better-cart",
	name: "Better Cart",
	website: "https://www.getbettercart.com/",
	description: "Better Cart is an ecommerce checkout powered by AI and predictive machine learning models.",
	icon: "BetterCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "better-cart:jsGlobal:0",
			kind: "jsGlobal",
			property: "betterCart$",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
