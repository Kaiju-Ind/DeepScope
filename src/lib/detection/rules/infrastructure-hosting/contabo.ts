import type { TechnologyDefinition } from '../../types';

export const contaboTechnologyDefinition = {
	id: "contabo",
	name: "Contabo",
	website: "https://contabo.com",
	description: "Contabo is a German hosting provider, previously known by the name Giga-International.",
	icon: "Contabo.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "contabo:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.contabo\\.net", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
