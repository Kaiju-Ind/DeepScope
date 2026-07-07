import type { TechnologyDefinition } from '../../types';

export const boldProductOptionsTechnologyDefinition = {
	id: "bold-product-options",
	name: "Bold Product Options",
	website: "https://boldcommerce.com/product-options",
	description: "Product Options is a Shopify app which allows customers to customise products with unlimited custom options built by Bold.",
	icon: "Bold.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bold-product-options:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("option\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-product-options:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOLD.options.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
		"bold-commerce",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
