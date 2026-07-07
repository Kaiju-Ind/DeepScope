import type { TechnologyDefinition } from '../../types';

export const zestmoneyTechnologyDefinition = {
	id: "zestmoney",
	name: "ZestMoney",
	website: "https://www.zestmoney.in",
	description: "ZestMoney is a fintech company that uses digital EMI without the need for a credit card or a credit score.",
	icon: "ZestMoney.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "zestmoney:jsGlobal:0",
			kind: "jsGlobal",
			property: "ZestMoneyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zestmoney:jsGlobal:1",
			kind: "jsGlobal",
			property: "zestBind",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zestmoney:jsGlobal:2",
			kind: "jsGlobal",
			property: "zestMerchant",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
