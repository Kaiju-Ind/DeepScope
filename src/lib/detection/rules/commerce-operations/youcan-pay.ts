import type { TechnologyDefinition } from '../../types';

export const youcanPayTechnologyDefinition = {
	id: "youcan-pay",
	name: "YouCan Pay",
	website: "https://youcanpay.com",
	description: "YouCan Pay is a developed electronic payment platform that provides effective solutions for the payment gatways issue in ecommerce in Morocco.",
	icon: "YouCan Pay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "youcan-pay:jsGlobal:0",
			kind: "jsGlobal",
			property: "YCPay",
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
