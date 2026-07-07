import type { TechnologyDefinition } from '../../types';

export const splittypayTechnologyDefinition = {
	id: "splittypay",
	name: "SplittyPay",
	website: "https://www.splittypay.com",
	description: "SplittyPay is an alternative payment platform designed for group reservations and purchases.",
	icon: "SplittyPay.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "splittypay:dom:0",
			kind: "dom",
			selector: "img[src*='splittypay']",
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
