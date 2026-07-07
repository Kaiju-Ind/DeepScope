import type { TechnologyDefinition } from '../../types';

export const vancoPaymentSolutionsTechnologyDefinition = {
	id: "vanco-payment-solutions",
	name: "Vanco Payment Solutions",
	website: "https://www.vancopayments.com",
	description: "Vanco Payment Solutions provides credit card processing to nonprofits.",
	icon: "Vanco.svg",
	categories: [
		"fundraising-donations",
		"commerce-operations",
	],
	rules: [
		{
			id: "vanco-payment-solutions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.eservicepayments\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vanco-payment-solutions:dom:1",
			kind: "dom",
			selector: "a[href*='.eservicepayments.com/']",
			description: "DOM selector matches a known technology marker.",
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
