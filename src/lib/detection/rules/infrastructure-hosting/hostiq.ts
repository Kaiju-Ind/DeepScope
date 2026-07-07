import type { TechnologyDefinition } from '../../types';

export const hostiqTechnologyDefinition = {
	id: "hostiq",
	name: "Hostiq",
	website: "https://hostiq.ua",
	description: "Hostiq is a web hosting provider and internet domain registrar.",
	icon: "Hostiq.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hostiq:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.hostiq\\.ua", "i"),
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
