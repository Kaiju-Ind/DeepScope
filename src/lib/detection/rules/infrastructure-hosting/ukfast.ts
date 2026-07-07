import type { TechnologyDefinition } from '../../types';

export const ukfastTechnologyDefinition = {
	id: "ukfast",
	name: "UKFast",
	website: "https://www.ukfast.co.uk",
	description: "UKFast is a business-to-business internet hosting company based in Manchester, UK.",
	icon: "UKFast.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "ukfast:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.ukfast\\.net", "i"),
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
