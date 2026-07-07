import type { TechnologyDefinition } from '../../types';

export const ventraipTechnologyDefinition = {
	id: "ventraip",
	name: "VentraIP",
	website: "https://ventraip.com.au",
	description: "VentraIP is the largest privately owned web host and domain name registrar in Australia.",
	icon: "VentraIP.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "ventraip:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.(?:nameserver|hostingplatform)\\.net\\.au", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "ventraip:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.(?:nameserver|hostingplatform)\\.net\\.au", "i"),
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
