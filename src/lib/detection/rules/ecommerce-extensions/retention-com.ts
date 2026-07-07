import type { TechnologyDefinition } from '../../types';

export const retentionComTechnologyDefinition = {
	id: "retention-com",
	name: "Retention.com",
	website: "https://retention.com",
	description: "Retention.com's identity resolution software helps Shopify merchants recover lost shoppers.",
	icon: "Retention.com.svg",
	categories: [
		"ecommerce-extensions",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "retention-com:jsGlobal:0",
			kind: "jsGlobal",
			property: "B2BRetention",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retention-com:jsGlobal:1",
			kind: "jsGlobal",
			property: "addedToCartRetentionButton",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retention-com:jsGlobal:2",
			kind: "jsGlobal",
			property: "viewedProductRetention",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
