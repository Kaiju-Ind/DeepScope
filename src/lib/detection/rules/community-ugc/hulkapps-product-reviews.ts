import type { TechnologyDefinition } from '../../types';

export const hulkappsProductReviewsTechnologyDefinition = {
	id: "hulkapps-product-reviews",
	name: "HulkApps Product Reviews",
	website: "https://www.hulkapps.com/products/product-reviews-shopify",
	description: "HulkApps Product Reviews is a customer product reviews app for building social proof for store.",
	icon: "HulkApps.svg",
	categories: [
		"community-ugc",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hulkapps-product-reviews:dom:0",
			kind: "dom",
			selector: "link[href*='reviews.hulkapps.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hulkapps-product-reviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "hulkappsProductReview",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hulkapps-product-reviews:jsGlobal:2",
			kind: "jsGlobal",
			property: "hulkappsReviews",
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
