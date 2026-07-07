import type { TechnologyDefinition } from '../../types';

export const hulkappsInfiniteProductOptionsTechnologyDefinition = {
	id: "hulkapps-infinite-product-options",
	name: "HulkApps Infinite Product Options",
	website: "https://www.hulkapps.com/products/infinite-product-options-shopify",
	description: "HulkApps Infinite Product Options is a unlimited custom options for products. Display variant options as buttons, color and image swatches, and more.",
	icon: "HulkApps.svg",
	categories: [
		"experimentation-optimization",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hulkapps-infinite-product-options:jsGlobal:0",
			kind: "jsGlobal",
			property: "hulkapps.po_url",
			valuePattern: new RegExp("productoption\\.hulkapps\\.com"),
			description: "Page-owned global matches a known technology marker.",
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
