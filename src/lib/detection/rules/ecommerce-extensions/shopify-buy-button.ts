import type { TechnologyDefinition } from '../../types';

export const shopifyBuyButtonTechnologyDefinition = {
	id: "shopify-buy-button",
	name: "Shopify Buy Button",
	website: "https://apps.shopify.com/buy-button",
	description: "Shopify Buy Button is an app from Shopify which allows merchant to embed buy functionality for any product or collection into another website or blog.",
	icon: "Shopify.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shopify-buy-button:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\. shopifycdn\\.com\\/buy-button\\/latest\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopify-buy-button:jsGlobal:1",
			kind: "jsGlobal",
			property: "ShopifyBuy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopify-buy-button:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("sdks\\.shopifycdn\\.com\\/buy-button\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopify-buy-button:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("sdks\\.shopifycdn\\.com\\/js-buy-sdk\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
