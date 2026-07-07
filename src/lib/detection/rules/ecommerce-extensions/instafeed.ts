import type { TechnologyDefinition } from '../../types';

export const instafeedTechnologyDefinition = {
	id: "instafeed",
	name: "Instafeed",
	website: "https://apps.shopify.com/instafeed",
	description: "Instafeed is an official Instagram app.",
	icon: "Instafeed.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "instafeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("instafeed\\.nfcube\\.com\\/"),
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
