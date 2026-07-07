import type { TechnologyDefinition } from '../../types';

export const cashewTechnologyDefinition = {
	id: "cashew",
	name: "cashew",
	website: "https://www.cashewpayments.com",
	description: "Cashew is a buy now, pay later platform that allows its customers to shop now and pay later in equal monthly installments.",
	icon: "cashew.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "cashew:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cashewpayments\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cashew:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.cashewpayments\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cashew:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.cashewpayments\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
