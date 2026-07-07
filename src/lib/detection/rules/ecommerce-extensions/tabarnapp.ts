import type { TechnologyDefinition } from '../../types';

export const tabarnappTechnologyDefinition = {
	id: "tabarnapp",
	name: "Tabarnapp",
	website: "https://tabarnapp.com",
	description: "Tabarnapp is a platform for Shopify apps and themes.",
	icon: "Tabarnapp.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "tabarnapp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.tabarn\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tabarnapp:jsGlobal:1",
			kind: "jsGlobal",
			property: "tabarnapp_loaded_ad",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
