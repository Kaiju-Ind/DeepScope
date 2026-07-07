import type { TechnologyDefinition } from '../../types';

export const worldpayTechnologyDefinition = {
	id: "worldpay",
	name: "WorldPay",
	website: "https://online.worldpay.com",
	description: "WorldPay is a merchant services and payment processing provider offering a payment gateway for online transactions.",
	icon: "WorldPay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "worldpay:dom:0",
			kind: "dom",
			selector: "img[src*='secure.worldpay.com'], img[alt='Powered by WorldPay'], a[href*='worldpay.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
