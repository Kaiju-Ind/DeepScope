import type { TechnologyDefinition } from '../../types';

export const bootpayTechnologyDefinition = {
	id: "bootpay",
	name: "Bootpay",
	website: "https://www.bootpay.co.kr",
	description: "Bootpay is a payment integration service from Korea that enables businesses to process online transactions.",
	icon: "Bootpay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bootpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bootpay\\.co\\.kr\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
