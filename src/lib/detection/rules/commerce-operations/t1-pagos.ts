import type { TechnologyDefinition } from '../../types';

export const t1PagosTechnologyDefinition = {
	id: "t1-pagos",
	name: "T1 Pagos",
	website: "https://www.t1pagos.com",
	description: "T1 Pagos is a payment processing platform.",
	icon: "T1 Pagos.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "t1-pagos:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^T1PAGOS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "t1-pagos:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^t1pagos$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
