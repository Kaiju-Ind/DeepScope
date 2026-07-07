import type { TechnologyDefinition } from '../../types';

export const shopbaseTechnologyDefinition = {
	id: "shopbase",
	name: "ShopBase",
	website: "https://www.shopbase.com",
	description: "ShopBase is a cross-border ecommerce platform for all Dropshipping/Print-on-Demand novices and experienced merchants.",
	icon: "ShopBase.svg",
	categories: [
		"platform-cms-builder",
		"commerce-operations",
	],
	rules: [
		{
			id: "shopbase:jsGlobal:0",
			kind: "jsGlobal",
			property: "sbsdk.checkout.setEnableABTestCustomer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopbase:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("(?:accounts|templates)\\.shopbase\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
