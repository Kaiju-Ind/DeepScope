import type { TechnologyDefinition } from '../../types';

export const nextBasketTechnologyDefinition = {
	id: "next-basket",
	name: "Next Basket",
	website: "https://nextbasket.com",
	description: "Next Basket is an AI-based software platform designed to create online stores and warehouses for products.",
	icon: "NextBasket.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "next-basket:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^NextBasket.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "next-basket:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^nextbasket.com$", "i"),
			description: "Meta tag matches a known technology marker.",
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
