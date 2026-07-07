import type { TechnologyDefinition } from '../../types';

export const openpayTechnologyDefinition = {
	id: "openpay",
	name: "OpenPay",
	website: "https://www.openpay.com.au/",
	description: "Openpay is an innovative online and in-store payment solution enabling you to purchase now and pay later, with no interest.",
	icon: "openpay.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "openpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("openpay\\.com.\\au"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
