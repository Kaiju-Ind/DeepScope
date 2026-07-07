import type { TechnologyDefinition } from '../../types';

export const shopifyProductReviewsTechnologyDefinition = {
	id: "shopify-product-reviews",
	name: "Shopify Product Reviews",
	website: "https://apps.shopify.com/product-reviews",
	description: "Shopify Product reviews allows you to add a customer review feature to your products.",
	icon: "Shopify.svg",
	categories: [
		"community-ugc",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shopify-product-reviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("productreviews\\.shopifycdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopify-product-reviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "SPR",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
