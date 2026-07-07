import type { TechnologyDefinition } from '../../types';

export const hostingUkraineTechnologyDefinition = {
	id: "hosting-ukraine",
	name: "Hosting Ukraine",
	website: "https://www.ukraine.com.ua",
	description: "Hosting Ukraine is a web hosting provider and internet domain registrar.",
	icon: "Hosting Ukraine.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hosting-ukraine:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.ukraine\\.com\\.ua", "i"),
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
