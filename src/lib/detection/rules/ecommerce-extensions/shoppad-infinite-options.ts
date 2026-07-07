import type { TechnologyDefinition } from '../../types';

export const shoppadInfiniteOptionsTechnologyDefinition = {
	id: "shoppad-infinite-options",
	name: "ShopPad Infinite Options",
	website: "https://apps.shopify.com/custom-options",
	description: "ShopPad Infinite Options allows you to create as many custom option fields for your product pages as you need.",
	icon: "ShopPad.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shoppad-infinite-options:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shoppad.apps.infiniteoptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
