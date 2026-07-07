import type { TechnologyDefinition } from '../../types';

export const poliPaymentTechnologyDefinition = {
	id: "poli-payment",
	name: "POLi Payment",
	website: "https://www.polipayments.com",
	description: "POLi Payment(formerly known as Centricom) is an online payment service in Australia and New Zealand.",
	icon: "POLi Payment.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "poli-payment:jsGlobal:0",
			kind: "jsGlobal",
			property: "wc_ga_pro.available_gateways.poli",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
