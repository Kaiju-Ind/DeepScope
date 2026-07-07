import type { TechnologyDefinition } from '../../types';

export const payTechnologyDefinition = {
	id: "pay",
	name: "Pay.",
	website: "https://www.pay.nl",
	description: "Pay. is an all-in-one payment provider offering integrated solutions for processing online and in-store transactions.",
	icon: "PayNL.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pay:jsGlobal:0",
			kind: "jsGlobal",
			property: "PaynlLabel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pay:jsGlobal:1",
			kind: "jsGlobal",
			property: "paynl_gateways",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
