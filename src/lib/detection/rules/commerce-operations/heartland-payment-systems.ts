import type { TechnologyDefinition } from '../../types';

export const heartlandPaymentSystemsTechnologyDefinition = {
	id: "heartland-payment-systems",
	name: "Heartland Payment Systems",
	website: "https://www.heartlandpaymentsystems.com",
	description: "Heartland Payment Systems is an US-based payment processing and technology provider.",
	icon: "Heartland Payment Systems.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "heartland-payment-systems:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.heartlandportico\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
