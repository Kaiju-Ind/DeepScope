import type { TechnologyDefinition } from '../../types';

export const shiptectionTechnologyDefinition = {
	id: "shiptection",
	name: "ShipTection",
	website: "https://wamapps.io/pages/shiptection-protection",
	description: "ShipTection is the easiest way to offer shipping protection on your Shopify site.",
	icon: "ShipTection.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shiptection:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.shiptection\\.com\\/"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
