import type { TechnologyDefinition } from '../../types';

export const globalshopexTechnologyDefinition = {
	id: "globalshopex",
	name: "GlobalShopex",
	website: "https://www.globalshopex.com",
	description: "GlobalShopex offers a logistics ecommerce solution easy to integrate, which helps online businesses to sell in over 200 countries.",
	icon: "GlobalShopex.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "globalshopex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/globalshopex\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "globalshopex:jsGlobal:1",
			kind: "jsGlobal",
			property: "GSXMiniCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "globalshopex:jsGlobal:2",
			kind: "jsGlobal",
			property: "GSXPreviewCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
