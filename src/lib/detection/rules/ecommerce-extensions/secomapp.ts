import type { TechnologyDefinition } from '../../types';

export const secomappTechnologyDefinition = {
	id: "secomapp",
	name: "Secomapp",
	website: "https://www.secomapp.com",
	description: "Secomapp is a trusted Shopify Expert providing services through Shopify Apps.",
	icon: "Secomapp.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "secomapp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.secomapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "secomapp:jsGlobal:1",
			kind: "jsGlobal",
			property: "SECOMAPP",
			description: "Page-owned global matches a known technology marker.",
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
