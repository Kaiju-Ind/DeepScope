import type { TechnologyDefinition } from '../../types';

export const feraProductReviewsAppTechnologyDefinition = {
	id: "fera-product-reviews-app",
	name: "Fera Product Reviews App",
	website: "https://apps.shopify.com/fera",
	description: "Fera Product Reviews App is a product review and social proof app for Shopify.",
	icon: "Fera.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "fera-product-reviews-app:jsGlobal:0",
			kind: "jsGlobal",
			property: "feraJsUrl",
			valuePattern: new RegExp("cdn\\.fera\\.ai\\/js\\/fera\\.js.+\\.myshopify\\.com"),
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
		"fera",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
