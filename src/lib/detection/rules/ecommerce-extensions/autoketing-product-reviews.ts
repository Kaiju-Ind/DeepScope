import type { TechnologyDefinition } from '../../types';

export const autoketingProductReviewsTechnologyDefinition = {
	id: "autoketing-product-reviews",
	name: "Autoketing Product Reviews",
	website: "https://apps.shopify.com/product-reviews-autoketing",
	description: "Autoketing Product Reviews is an application that allows shop owners to manage the product review section on their website.",
	icon: "Autoketing.png",
	categories: [
		"ecommerce-extensions",
		"community-ugc",
	],
	rules: [
		{
			id: "autoketing-product-reviews:jsGlobal:0",
			kind: "jsGlobal",
			property: "autoketingproduct_reivew",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"autoketing",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
