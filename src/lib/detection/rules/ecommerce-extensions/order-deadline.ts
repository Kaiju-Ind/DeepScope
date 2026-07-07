import type { TechnologyDefinition } from '../../types';

export const orderDeadlineTechnologyDefinition = {
	id: "order-deadline",
	name: "Order Deadline",
	website: "https://apps.shopify.com/order-deadline",
	description: "Order Deadline is an estimated delivery, countdown timer, shipping date Shopify app.",
	icon: "Order Deadline.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "order-deadline:jsGlobal:0",
			kind: "jsGlobal",
			property: "orderDeadlineAppByEESL",
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
