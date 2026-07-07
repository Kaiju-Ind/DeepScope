import type { TechnologyDefinition } from '../../types';

export const iyzicoTechnologyDefinition = {
	id: "iyzico",
	name: "iyzico",
	website: "https://www.iyzico.com",
	description: "iyzico is a payment receipt system management platform that offers ePayment solutions.",
	icon: "iyzico.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "iyzico:jsGlobal:0",
			kind: "jsGlobal",
			property: "iyz.ideaSoft",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "iyzico:jsGlobal:1",
			kind: "jsGlobal",
			property: "iyz.position",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
