import type { TechnologyDefinition } from '../../types';

export const revyTechnologyDefinition = {
	id: "revy",
	name: "Revy",
	website: "https://revy.io",
	description: "Revy is dedicated to build Shopify Apps to generate more sales for merchants.",
	icon: "Revy.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "revy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.revy\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "revy:jsGlobal:1",
			kind: "jsGlobal",
			property: "RevyApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "revy:jsGlobal:2",
			kind: "jsGlobal",
			property: "RevyBundle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "revy:jsGlobal:3",
			kind: "jsGlobal",
			property: "RevyUpsell",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
