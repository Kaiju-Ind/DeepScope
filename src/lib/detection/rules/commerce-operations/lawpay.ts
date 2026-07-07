import type { TechnologyDefinition } from '../../types';

export const lawpayTechnologyDefinition = {
	id: "lawpay",
	name: "LawPay",
	website: "https://www.lawpay.com",
	description: "Payment for law firms.",
	icon: "Lawpay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "lawpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\b(?:lawpay)\\b"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
