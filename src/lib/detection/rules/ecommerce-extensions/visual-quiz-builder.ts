import type { TechnologyDefinition } from '../../types';

export const visualQuizBuilderTechnologyDefinition = {
	id: "visual-quiz-builder",
	name: "Visual Quiz Builder",
	website: "https://apps.shopify.com/product-recommendation-quiz",
	description: "Visual Quiz Builder is a Shopify app built by AskWhai.",
	icon: "Visual Quiz Builder.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "visual-quiz-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/whai-cdn\\.nyc\\d\\.cdn\\.digitaloceanspaces\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
