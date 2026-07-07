import type { TechnologyDefinition } from '../../types';

export const bonLoyaltyTechnologyDefinition = {
	id: "bon-loyalty",
	name: "BON Loyalty",
	website: "https://bonloyalty.com",
	description: "BON Loyalty is a free rewards and referrals app that helps merchants increase customer engagement with captivating points, rewards & referral program.",
	icon: "BON Loyalty.svg",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bon-loyalty:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.bonloyalty\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bon-loyalty:jsGlobal:1",
			kind: "jsGlobal",
			property: "bonShopInfo.appearance",
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
