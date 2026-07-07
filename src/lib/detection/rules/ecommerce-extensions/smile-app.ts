import type { TechnologyDefinition } from '../../types';

export const smileAppTechnologyDefinition = {
	id: "smile-app",
	name: "Smile App",
	website: "https://apps.shopify.com/smile-io",
	description: "Smile App offers a loyalty program for Shopify stores.",
	icon: "Smile.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "smile-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.smile\\.io\\/.+smile-shopify\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	implies: [
		"smile",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
