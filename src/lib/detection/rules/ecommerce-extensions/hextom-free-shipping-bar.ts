import type { TechnologyDefinition } from '../../types';

export const hextomFreeShippingBarTechnologyDefinition = {
	id: "hextom-free-shipping-bar",
	name: "Hextom Free Shipping Bar",
	website: "https://hextom.com/case_study/free-shipping-bar",
	description: "Free Shipping Bar is a Shopify app built by Hextom. Free Shipping Bar help promote free shipping with progressive messages to motivate customers to buy more.",
	icon: "Hextom.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hextom-free-shipping-bar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hextom\\.com\\/js\\/freeshippingbar\\.js"),
			description: "Script source URL matches a known technology marker.",
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
