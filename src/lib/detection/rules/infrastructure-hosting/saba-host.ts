import type { TechnologyDefinition } from '../../types';

export const sabaHostTechnologyDefinition = {
	id: "saba-host",
	name: "Saba.Host",
	website: "https://saba.host",
	description: "Saba.Host is a total web-hosting solutions. It provides shared hosting, WordPress hosting, dedicated server, virtual private server (VPS), SSL and more.",
	icon: "Saba.Host.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "saba-host:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.saba\\.host", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
