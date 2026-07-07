import type { TechnologyDefinition } from '../../types';

export const reputonTechnologyDefinition = {
	id: "reputon",
	name: "Reputon",
	website: "https://reputon.com",
	description: "Reputon is an customer reviews Shopify app.",
	icon: "Reputon.svg",
	categories: [
		"community-ugc",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "reputon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reputon\\.com\\/"),
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
