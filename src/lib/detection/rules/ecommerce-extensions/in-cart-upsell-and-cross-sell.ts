import type { TechnologyDefinition } from '../../types';

export const inCartUpsellAndCrossSellTechnologyDefinition = {
	id: "in-cart-upsell-and-cross-sell",
	name: "In Cart Upsell & Cross-Sell",
	website: "https://incartupsell.com",
	description: "In Cart Upsell & Cross-Sell is a Shopify app built by InCart Upsell, provides targeted upsells and cross-sells directly in your cart and product page.",
	icon: "In Cart Upsell & Cross-Sell.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "in-cart-upsell-and-cross-sell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.incartupsell\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
