import type { TechnologyDefinition } from '../../types';

export const t1EnviosTechnologyDefinition = {
	id: "t1-envios",
	name: "T1 Envios",
	website: "https://t1envios.com",
	description: "T1 Envios is a delivery solution, allows the business to select the best courier to send their packages.",
	icon: "T1 Envios.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "t1-envios:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^T1ENVIOS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "t1-envios:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^t1envios$", "i"),
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
