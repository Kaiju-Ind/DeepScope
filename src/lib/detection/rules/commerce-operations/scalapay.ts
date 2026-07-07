import type { TechnologyDefinition } from '../../types';

export const scalapayTechnologyDefinition = {
	id: "scalapay",
	name: "Scalapay",
	website: "https://www.scalapay.com/",
	description: "Scalapay is a payment method for e-commerce merchants in Europe that allows customers to buy now and pay later (BNPL).",
	icon: "Scalapay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "scalapay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.scalapay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
