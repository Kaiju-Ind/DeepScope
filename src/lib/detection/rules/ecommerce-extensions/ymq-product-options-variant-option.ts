import type { TechnologyDefinition } from '../../types';

export const ymqProductOptionsVariantOptionTechnologyDefinition = {
	id: "ymq-product-options-variant-option",
	name: "YMQ Product Options Variant Option",
	website: "https://apps.shopify.com/ymq-options",
	description: "YMQ Product Options Variant Option help add an unlimited number of product options to your items so you're not restricted by Shopify's limit of 3 options and 100 variants.",
	icon: "YMQ Product Options Variant Option.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "ymq-product-options-variant-option:jsGlobal:0",
			kind: "jsGlobal",
			property: "ymq_option.v",
			valuePattern: new RegExp("\\?v=([\\d\\.]+)"),
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
