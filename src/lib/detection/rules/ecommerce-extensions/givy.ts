import type { TechnologyDefinition } from '../../types';

export const givyTechnologyDefinition = {
	id: "givy",
	name: "Givy",
	website: "https://www.givy.ai",
	description: "Givy is a Shopify app that supports custom gift card amounts and product gifting, enabling online stores to offer flexible gifting options beyond standard fixed-value gift cards.",
	icon: "Givy.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "givy:jsGlobal:0",
			kind: "jsGlobal",
			property: "GIVY.config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
