import type { TechnologyDefinition } from '../../types';

export const shopappsTechnologyDefinition = {
	id: "shopapps",
	name: "Shopapps",
	website: "https://www.shopapps.in",
	description: "Shopapps is a trusted Shopify Expert providing services through Shopify Apps.",
	icon: "Shopapps.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shopapps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.myshopapps\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopapps:jsGlobal:1",
			kind: "jsGlobal",
			property: "iStockUrl",
			valuePattern: new RegExp("iwish\\.myshopapps\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopapps:jsGlobal:2",
			kind: "jsGlobal",
			property: "iWishUrl",
			valuePattern: new RegExp("iwish\\.myshopapps\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
