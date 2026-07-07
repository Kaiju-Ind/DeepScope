import type { TechnologyDefinition } from '../../types';

export const betterPriceTechnologyDefinition = {
	id: "better-price",
	name: "Better Price",
	website: "https://apps.shopify.com/better-price",
	description: "Better Price is a Shopify app which provide coupons to real leads only when discounted price is requested build by Architechpro.",
	icon: "Better Price.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "better-price:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/shopify-apps\\/\\/js\\/betterprice\\/betterprice\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "better-price:jsGlobal:1",
			kind: "jsGlobal",
			property: "fc_metafield_betterprice.betterpricesuccess",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
