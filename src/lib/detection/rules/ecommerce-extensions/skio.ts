import type { TechnologyDefinition } from '../../types';

export const skioTechnologyDefinition = {
	id: "skio",
	name: "Skio",
	website: "https://skio.com",
	description: "Skio helps brands on Shopify sell subscriptions without ripping their hair out.",
	icon: "Skio.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "skio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.skio\\.com\\/"),
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
