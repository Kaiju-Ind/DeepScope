import type { TechnologyDefinition } from '../../types';

export const infomaniakTechnologyDefinition = {
	id: "infomaniak",
	name: "Infomaniak",
	website: "https://www.infomaniak.com",
	description: "Infomaniak is a hosting company based in Geneva, Switzerland.",
	icon: "Infomaniak.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "infomaniak:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.infomaniak\\.ch", "i"),
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
