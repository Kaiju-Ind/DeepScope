import type { TechnologyDefinition } from '../../types';

export const aliReviewsTechnologyDefinition = {
	id: "ali-reviews",
	name: "Ali Reviews",
	website: "https://apps.shopify.com/ali-reviews",
	description: "Ali reviews is a shopify app to collect reviews from customers.",
	icon: "Alireviews.svg",
	categories: [
		"community-ugc",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "ali-reviews:jsGlobal:0",
			kind: "jsGlobal",
			property: "alireviews_tags",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
