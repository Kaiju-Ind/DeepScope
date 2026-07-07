import type { TechnologyDefinition } from '../../types';

export const klaviyoReviewsTechnologyDefinition = {
	id: "klaviyo-reviews",
	name: "Klaviyo Reviews",
	website: "https://www.klaviyo.com/product-reviews",
	description: "Klaviyo Reviews is a built-in product review offering for Shopify and WooCommerce by Klaviyo.",
	icon: "Klaviyo.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "klaviyo-reviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("klaviyo\\.com\\/onsite\\/js\\/reviews"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klaviyo-reviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "klaviyoReviewsProductDesignMode",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klaviyo-reviews:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.klaviyo\\.com\\/onsite\\/js\\/vendors~reviews"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klaviyo-reviews:dom:3",
			kind: "dom",
			selector: "div#klaviyo-product-reviews-wrapper",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"klaviyo",
	],
} as const satisfies TechnologyDefinition;
