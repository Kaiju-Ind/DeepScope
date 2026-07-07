import type { TechnologyDefinition } from '../../types';

export const visaCheckoutTechnologyDefinition = {
	id: "visa-checkout",
	name: "Visa Checkout",
	website: "https://checkout.visa.com",
	description: "Visa facilitates electronic funds transfers throughout the world, most commonly through Visa-branded credit cards, debit cards and prepaid cards.",
	icon: "Visa.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "visa-checkout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.checkout\\.visa\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
