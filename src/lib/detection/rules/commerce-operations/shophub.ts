import type { TechnologyDefinition } from '../../types';

export const shophubTechnologyDefinition = {
	id: "shophub",
	name: "ShopHub",
	website: "https://www.tryshophub.com",
	description: "ShopHub is a platform that helps Shopify store owners grow their businesses by providing loyalty programs, coupons, and email capture services.",
	icon: "ShopHub.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shophub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.tryshophub\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shophub:jsGlobal:1",
			kind: "jsGlobal",
			property: "toggleShopHubWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
