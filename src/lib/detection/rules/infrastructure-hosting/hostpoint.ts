import type { TechnologyDefinition } from '../../types';

export const hostpointTechnologyDefinition = {
	id: "hostpoint",
	name: "Hostpoint",
	website: "https://www.hostpoint.ch",
	description: "Hostpoint is a Switzerland-based web hosting company.",
	icon: "Hostpoint.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hostpoint:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.hostpoint\\.ch", "i"),
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
