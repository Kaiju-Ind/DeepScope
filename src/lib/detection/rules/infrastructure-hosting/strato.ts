import type { TechnologyDefinition } from '../../types';

export const stratoTechnologyDefinition = {
	id: "strato",
	name: "Strato",
	website: "https://www.strato.com",
	description: "Strato is an internet hosting service provider headquartered in Berlin, Germany which provide dedicated server hosting, a website builder and a cloud storage services.",
	icon: "Strato.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "strato:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.strato-rz\\.de", "i"),
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
