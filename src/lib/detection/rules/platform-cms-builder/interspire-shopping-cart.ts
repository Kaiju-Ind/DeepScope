import type { TechnologyDefinition } from '../../types';

export const interspireShoppingCartTechnologyDefinition = {
	id: "interspire-shopping-cart",
	name: "Interspire Shopping Cart",
	website: "https://www.interspire.com",
	description: "Interspire Shopping Cart is a platform that enables businesses to create, manage, and operate online stores.",
	icon: "Interspire.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "interspire-shopping-cart:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Interspire Shopping Cart$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
