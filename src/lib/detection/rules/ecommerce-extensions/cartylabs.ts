import type { TechnologyDefinition } from '../../types';

export const cartylabsTechnologyDefinition = {
	id: "cartylabs",
	name: "Cartylabs",
	website: "https://cartylabs.com",
	description: "Cartylabs is a Shopify application that provides a fast checkout experience and enables merchants to implement upsell and cross-sell features directly within the shopping cart.",
	icon: "Cartylabs.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "cartylabs:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("fast-checkout-api\\.cartylabs\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
