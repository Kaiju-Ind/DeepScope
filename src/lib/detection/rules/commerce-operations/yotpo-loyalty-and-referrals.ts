import type { TechnologyDefinition } from '../../types';

export const yotpoLoyaltyAndReferralsTechnologyDefinition = {
	id: "yotpo-loyalty-and-referrals",
	name: "Yotpo Loyalty & Referrals",
	website: "https://www.yotpo.com/platform/loyalty/",
	description: "Yotpo is a user-generated content marketing platform.",
	icon: "Yotpo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "yotpo-loyalty-and-referrals:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.swellrewards\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yotpo-loyalty-and-referrals:jsGlobal:1",
			kind: "jsGlobal",
			property: "SwellConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yotpo-loyalty-and-referrals:jsGlobal:2",
			kind: "jsGlobal",
			property: "swellAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yotpo-loyalty-and-referrals:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("cdn(?:-loyalty)?\\.(?:swellrewards|yotpo)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
