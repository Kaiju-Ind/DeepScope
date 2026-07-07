import type { TechnologyDefinition } from '../../types';

export const cartJsTechnologyDefinition = {
	id: "cart-js",
	name: "Cart.js",
	website: "https://cartjs.org",
	description: "Cart.js is a very small open-source Javascript library that makes the addition of powerful Ajax cart functionality to your Shopify theme a breeze.",
	icon: "Cart.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "cart-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:shopify-cartjs\\/([\\d\\.]+)|assets)\\/rivets-cart\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
