import type { TechnologyDefinition } from '../../types';

export const wishlistKingTechnologyDefinition = {
	id: "wishlist-king",
	name: "Wishlist King",
	website: "https://appmate.io",
	description: "Wishlist King is a Shopify app which helps you to add your favorite products or share the wishlist with your friends built by Appmate.",
	icon: "Wishlist King.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "wishlist-king:jsGlobal:0",
			kind: "jsGlobal",
			property: "Appmate.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			confidence: 1,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wishlist-king:jsGlobal:1",
			kind: "jsGlobal",
			property: "Appmate.wk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
