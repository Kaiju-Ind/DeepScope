import type { TechnologyDefinition } from '../../types';

export const easyRedirectsTechnologyDefinition = {
	id: "easy-redirects",
	name: "Easy Redirects",
	website: "https://apps.shopify.com/easyredirects",
	description: "Easy Redirects is a Shopify app built by Eastside, and part of the best Shopify Apps collection.",
	icon: "Easy Redirects.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "easy-redirects:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("easy-redirects\\..+\\/redirect-app\\.js"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
