import type { TechnologyDefinition } from '../../types';

export const hosteuropeTechnologyDefinition = {
	id: "hosteurope",
	name: "HostEurope",
	website: "https://www.hosteurope.de",
	description: "HostEurope is a European website hosting, email and domain name registrar company headquartered Hayes, West London.",
	icon: "HostEurope.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hosteurope:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.hosteurope\\.com", "i"),
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
