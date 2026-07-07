import type { TechnologyDefinition } from '../../types';

export const frequentlyBoughtTogetherTechnologyDefinition = {
	id: "frequently-bought-together",
	name: "Frequently Bought Together",
	website: "https://www.codeblackbelt.com",
	description: "Frequently Bought Together is a Shopify app which add Amazon-like 'Customers Who Bought This Item Also Bought' product recommendations to your store.",
	icon: "Frequently Bought Together.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "frequently-bought-together:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.codeblackbelt\\.com\\/js\\/modules\\/frequently-bought-together\\/"),
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
