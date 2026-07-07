import type { TechnologyDefinition } from '../../types';

export const liquidWebTechnologyDefinition = {
	id: "liquid-web",
	name: "Liquid Web",
	website: "https://www.liquidweb.com",
	description: "Liquid Web is a US-based host offering premium managed web hosting solutions.",
	icon: "Liquid Web.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "liquid-web:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.liquidweb\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
