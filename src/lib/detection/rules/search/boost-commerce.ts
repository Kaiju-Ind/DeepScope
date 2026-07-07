import type { TechnologyDefinition } from '../../types';

export const boostCommerceTechnologyDefinition = {
	id: "boost-commerce",
	name: "Boost Commerce",
	website: "https://boostcommerce.net",
	description: "Boost Commerce provides beautiful and advanced product filter and smart site search for Shopify stores to boost sales.",
	icon: "Boost Commerce.png",
	categories: [
		"search",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "boost-commerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "bcSfFilterConfig.api.filterUrl",
			valuePattern: new RegExp("services\\.mybcapps\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boost-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "boostPFSAppConfig.api.filterUrl",
			valuePattern: new RegExp("services\\.mybcapps\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
