import type { TechnologyDefinition } from '../../types';

export const hostingerTechnologyDefinition = {
	id: "hostinger",
	name: "Hostinger",
	website: "https://www.hostinger.com",
	description: "Hostinger is an employee-owned Web hosting provider and internet domain registrar.",
	icon: "Hostinger.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hostinger:header:0",
			kind: "header",
			key: "platform",
			valuePattern: new RegExp("hostinger", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hostinger:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.(?:dns-parking|hostinger)\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:hostinger:hostinger:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
