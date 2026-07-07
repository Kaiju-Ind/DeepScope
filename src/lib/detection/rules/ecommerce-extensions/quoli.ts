import type { TechnologyDefinition } from '../../types';

export const quoliTechnologyDefinition = {
	id: "quoli",
	name: "Quoli",
	website: "https://quoli.io",
	description: "Quoli is a Shopify app designed to help merchants collect and showcase social proof, incorporating product reviews, photos/videos, attributes, nuggets, questions, and user-generated content (UGC).",
	icon: "Quoli.png",
	categories: [
		"ecommerce-extensions",
		"community-ugc",
	],
	rules: [
		{
			id: "quoli:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quoli\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
