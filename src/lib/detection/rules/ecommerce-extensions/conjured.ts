import type { TechnologyDefinition } from '../../types';

export const conjuredTechnologyDefinition = {
	id: "conjured",
	name: "Conjured",
	website: "https://conjured.co",
	description: "Conjured provides Shopify brands with Shopify apps and custom development.",
	icon: "Conjured.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "conjured:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.conjured\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
