import type { TechnologyDefinition } from '../../types';

export const pickrrTechnologyDefinition = {
	id: "pickrr",
	name: "Pickrr",
	website: "https://pickrr.com",
	description: "Pickrr is a logistics and shipping solution that manages and optimizes order fulfillment for ecommerce businesses.",
	icon: "Pickrr.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pickrr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.pickrr\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
