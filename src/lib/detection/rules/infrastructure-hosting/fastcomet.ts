import type { TechnologyDefinition } from '../../types';

export const fastcometTechnologyDefinition = {
	id: "fastcomet",
	name: "FastComet",
	website: "https://www.fastcomet.com",
	description: "FastComet is a hosting service company from San Francisco, California.",
	icon: "FastComet.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "fastcomet:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.fcomet\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
