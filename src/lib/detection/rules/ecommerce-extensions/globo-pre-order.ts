import type { TechnologyDefinition } from '../../types';

export const globoPreOrderTechnologyDefinition = {
	id: "globo-pre-order",
	name: "Globo Pre-Order",
	website: "https://apps.shopify.com/pre-order-pro",
	description: "Globo Pre-Order is a Shopify app for building pre-order functionality on Shopify stores.",
	icon: "Globo apps.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "globo-pre-order:jsGlobal:0",
			kind: "jsGlobal",
			property: "GloboPreorderParams",
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
