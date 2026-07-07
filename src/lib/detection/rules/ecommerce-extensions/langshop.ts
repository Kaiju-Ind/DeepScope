import type { TechnologyDefinition } from '../../types';

export const langshopTechnologyDefinition = {
	id: "langshop",
	name: "LangShop",
	website: "https://langshop.io",
	description: "LangShop is an app for translating Shopify stores.",
	icon: "LangShop.svg",
	categories: [
		"ecommerce-extensions",
		"translations",
	],
	rules: [
		{
			id: "langshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.langshop\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "langshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "LangShop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "langshop:jsGlobal:2",
			kind: "jsGlobal",
			property: "LangShopConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "langshop:jsGlobal:3",
			kind: "jsGlobal",
			property: "LangShopSDK",
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
