import type { TechnologyDefinition } from '../../types';

export const citruspayTechnologyDefinition = {
	id: "citruspay",
	name: "CitrusPay",
	website: "https://consumers.citruspay.com/",
	description: "CitrusPay provides payement gateway and wallet services.",
	icon: "citruspay.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "citruspay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout-static\\.citruspay\\.com\\/"),
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
