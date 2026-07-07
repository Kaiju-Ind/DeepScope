import type { TechnologyDefinition } from '../../types';

export const mollieTechnologyDefinition = {
	id: "mollie",
	name: "Mollie",
	website: "https://www.mollie.com",
	description: "Mollie is a payment provider for Belgium and the Netherlands, offering payment methods such as credit card, iDEAL, Bancontact/Mister cash, PayPal, SCT, SDD, and others.",
	icon: "Mollie.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mollie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/mollie-payments-for-woocommerce\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mollie:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mollie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
