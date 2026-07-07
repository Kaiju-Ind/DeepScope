import type { TechnologyDefinition } from '../../types';

export const zenCartTechnologyDefinition = {
	id: "zen-cart",
	name: "Zen Cart",
	website: "https://www.zen-cart.com",
	icon: "Zen Cart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zen-cart:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Zen Cart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zen-cart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("zen cart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:zen-cart:zen_cart:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
