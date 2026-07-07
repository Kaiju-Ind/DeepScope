import type { TechnologyDefinition } from '../../types';

export const backInStockTechnologyDefinition = {
	id: "back-in-stock",
	name: "Back In Stock",
	website: "https://backinstock.org",
	description: "Back In Stock lets your customers choose restock alerts for specific variant combinations, including size, colour or style.",
	icon: "Back In Stock.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "back-in-stock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.backinstock\\.org\\/"),
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
