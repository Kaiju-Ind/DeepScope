import type { TechnologyDefinition } from '../../types';

export const shopPayInstallmentsTechnologyDefinition = {
	id: "shop-pay-installments",
	name: "Shop Pay Installments",
	website: "https://shoppay.affirm.com",
	description: "Shop Pay Installments allows customers to pay for orders between 50 USD and 3,000 USD in 4 interest-free installments.",
	icon: "Shop Pay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shop-pay-installments:dom:0",
			kind: "dom",
			selector: ".shopify-installments__learn-more, .shopify-installments, #shopify-installments-cta",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"affirm",
		"shop-pay",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
