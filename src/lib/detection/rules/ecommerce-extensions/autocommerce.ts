import type { TechnologyDefinition } from '../../types';

export const autocommerceTechnologyDefinition = {
	id: "autocommerce",
	name: "Autocommerce",
	website: "https://autocommerce.io",
	description: "Autocommerce is a product recommendation app for Shopify stores, similar to Amazon, designed to enhance the shopping experience by suggesting relevant products to customers based on their browsing and purchase history.",
	icon: "Autocommerce.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "autocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.autocommerce\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
