import type { TechnologyDefinition } from '../../types';

export const tikshopTechnologyDefinition = {
	id: "tikshop",
	name: "TikShop",
	website: "https://tikshop.co",
	description: "TikShop is a tool that integrates TikTok accounts with Shopify stores, allowing for the creation of shoppable feeds to facilitate quicker product promotion and sales directly through TikTok.",
	icon: "TikShop.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "tikshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.tikshop\\.co\\/"),
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
