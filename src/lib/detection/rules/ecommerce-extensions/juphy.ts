import type { TechnologyDefinition } from '../../types';

export const juphyTechnologyDefinition = {
	id: "juphy",
	name: "Juphy",
	website: "https://juphy.com",
	description: "Juphy is an AI sales assistant designed for Shopify stores, enabling businesses to increase sales through automated customer engagement and support.",
	icon: "Juphy.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "juphy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.juphy\\.com\\/"),
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
