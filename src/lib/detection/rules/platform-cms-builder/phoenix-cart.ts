import type { TechnologyDefinition } from '../../types';

export const phoenixCartTechnologyDefinition = {
	id: "phoenix-cart",
	name: "Phoenix Cart",
	website: "https://phoenixcart.org",
	description: "Phoenix Cart is an open source software that allows users to set up an online store and sell their products.",
	icon: "PhoenixCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "phoenix-cart:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ceid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
