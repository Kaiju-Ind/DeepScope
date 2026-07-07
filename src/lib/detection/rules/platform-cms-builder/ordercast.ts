import type { TechnologyDefinition } from '../../types';

export const ordercastTechnologyDefinition = {
	id: "ordercast",
	name: "OrderCast",
	website: "https://www.ordercast.io",
	description: "OrderCast is a B2B ecommerce platform focused on streamlining wholesale operations, offering SKU management, order handling, and customisable online store features for improved customer experience.",
	icon: "OrderCast.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ordercast:url:0",
			kind: "url",
			pattern: new RegExp("\\.(?:eu|us1)\\.ordercast\\.io\\/"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"python",
		"react",
	],
} as const satisfies TechnologyDefinition;
