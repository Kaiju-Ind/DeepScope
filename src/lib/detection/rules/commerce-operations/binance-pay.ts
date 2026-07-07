import type { TechnologyDefinition } from '../../types';

export const binancePayTechnologyDefinition = {
	id: "binance-pay",
	name: "Binance Pay",
	website: "https://pay.binance.com",
	description: "Binance Pay is a contactless, borderless, and secure cryptocurrency payment technology designed by Binance.",
	icon: "Binance.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "binance-pay:dom:0",
			kind: "dom",
			selector: "a[href*='app.binance.com/payment/secpay']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
