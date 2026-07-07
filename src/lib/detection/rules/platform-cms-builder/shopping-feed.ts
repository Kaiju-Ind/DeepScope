import type { TechnologyDefinition } from '../../types';

export const shoppingFeedTechnologyDefinition = {
	id: "shopping-feed",
	name: "Shopping Feed",
	website: "https://shoppingfeed.com",
	description: "Shopping Feed is a multi-channel ecommerce inventory management tool designed to synchronize product listings, stock levels, and order data across various online marketplaces.",
	icon: "ShoppingFeed.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopping-feed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tracking\\.shopping-flux\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
