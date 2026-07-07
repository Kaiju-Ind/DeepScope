import type { TechnologyDefinition } from '../../types';

export const hostgatorTechnologyDefinition = {
	id: "hostgator",
	name: "Hostgator",
	website: "https://www.hostgator.com",
	description: "HostGator is a Houston-based provider of shared, reseller, virtual private server, and dedicated web hosting with an additional presence in Austin, Texas.",
	icon: "Hostgator.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hostgator:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.hostgator\\.com", "i"),
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
