import type { TechnologyDefinition } from '../../types';

export const tnsPaymentsTechnologyDefinition = {
	id: "tns-payments",
	name: "TNS Payments",
	website: "https://tnsi.com/products/payments/",
	description: "TNS Payments, is designed to deliver payment transaction information to banks, merchants, processors and other payment institutions.",
	icon: "tnsi.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "tns-payments:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.ap\\.tnspayments\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
