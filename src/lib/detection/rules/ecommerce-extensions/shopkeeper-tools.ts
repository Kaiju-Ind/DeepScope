import type { TechnologyDefinition } from '../../types';

export const shopkeeperToolsTechnologyDefinition = {
	id: "shopkeeper-tools",
	name: "ShopKeeper Tools",
	website: "https://www.shopkeepertools.com",
	description: "ShopKeeper Tools is a suite of easy-to-use Shopify apps designed to increase conversion rates and drive revenue growth for online stores.",
	icon: "ShopKeeper.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shopkeeper-tools:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("magic-button-app\\.shopkeepertools\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
