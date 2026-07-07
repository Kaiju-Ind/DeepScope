import type { TechnologyDefinition } from '../../types';

export const billbeeTechnologyDefinition = {
	id: "billbee",
	name: "Billbee",
	website: "https://www.billbee.io/",
	description: "Billbee is an order processing and inventory management solution.",
	icon: "Billbee.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "billbee:text:0",
			kind: "text",
			pattern: new RegExp("\\bBillbee\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
