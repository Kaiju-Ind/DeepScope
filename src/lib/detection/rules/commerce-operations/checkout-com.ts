import type { TechnologyDefinition } from '../../types';

export const checkoutComTechnologyDefinition = {
	id: "checkout-com",
	name: "Checkout.com",
	website: "https://www.checkout.com",
	description: "Checkout.com is an international payment platform that processes different payment methods across a variety of currencies.",
	icon: "Checkout.com.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "checkout-com:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.checkout\\.com\\/js\\/.+js(?:\\?ver=)?([\\d\\.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
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
