import type { TechnologyDefinition } from '../../types';

export const swymWishlistPlusTechnologyDefinition = {
	id: "swym-wishlist-plus",
	name: "Swym Wishlist Plus",
	website: "https://swym.it/apps/wishlist/",
	description: "Swym Wishlist Plus enables your customers to bookmark their favorite products and pick up where they left off when they return.",
	icon: "Swym.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "swym-wishlist-plus:jsGlobal:0",
			kind: "jsGlobal",
			property: "swappName",
			valuePattern: new RegExp("Wishlist"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "swym-wishlist-plus:jsGlobal:1",
			kind: "jsGlobal",
			property: "swymCart.attributes",
			confidence: 50,
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
