import type { TechnologyDefinition } from '../../types';

export const dwollaTechnologyDefinition = {
	id: "dwolla",
	name: "Dwolla",
	website: "https://www.dwolla.com",
	description: "Dwolla is a payment platform that enables businesses to transfer funds electronically through the Automated Clearing House (ACH) network.",
	icon: "Dwolla.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "dwolla:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.dwolla\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
