import type { TechnologyDefinition } from '../../types';

export const hostensTechnologyDefinition = {
	id: "hostens",
	name: "Hostens",
	website: "https://www.hostens.com",
	description: "Hostens is a web hosting company specialising in hosting services, virtual private server hosting, and the domain name or transition.",
	icon: "Hostens.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hostens:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.hostens\\.com", "i"),
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
