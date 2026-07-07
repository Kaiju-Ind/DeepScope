import type { TechnologyDefinition } from '../../types';

export const kueskipayTechnologyDefinition = {
	id: "kueskipay",
	name: "KueskiPay",
	website: "https://kueskipay.com/",
	description: "KueskiPay is a buy-now-pay-later solution.",
	icon: "KueskiPay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "kueskipay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.kueskipay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kueskipay:jsGlobal:1",
			kind: "jsGlobal",
			property: "kueskypushhead",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
