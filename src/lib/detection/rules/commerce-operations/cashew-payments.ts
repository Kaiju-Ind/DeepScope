import type { TechnologyDefinition } from '../../types';

export const cashewPaymentsTechnologyDefinition = {
	id: "cashew-payments",
	name: "Cashew Payments",
	website: "https://www.cashewpayments.com",
	description: "Cashew Payments is a buy now, pay later platform that allows its customers to shop now and pay later in equal monthly installments.",
	icon: "Cashew Payments.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "cashew-payments:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cashewpayments\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cashew-payments:header:1",
			kind: "header",
			key: "Content-Security-Policy",
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
