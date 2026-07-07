import type { TechnologyDefinition } from '../../types';

export const conversioAppTechnologyDefinition = {
	id: "conversio-app",
	name: "Conversio App",
	website: "https://apps.shopify.com/conversio",
	description: "Conversio App is an optimisation and analytics app for Shopify stores.",
	icon: "Conversio.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "conversio-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.conversio\\.com\\/.+\\.myshopify\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"conversio",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
