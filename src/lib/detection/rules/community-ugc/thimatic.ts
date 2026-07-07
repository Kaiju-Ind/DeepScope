import type { TechnologyDefinition } from '../../types';

export const thimaticTechnologyDefinition = {
	id: "thimatic",
	name: "Thimatic",
	website: "https://thimatic-apps.com/",
	description: "Thimatic is a Shopify app for product reviews.",
	icon: "Thimatic.png",
	categories: [
		"community-ugc",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "thimatic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("thimatic-apps\\.com\\/product_review\\/.*?v=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
} as const satisfies TechnologyDefinition;
