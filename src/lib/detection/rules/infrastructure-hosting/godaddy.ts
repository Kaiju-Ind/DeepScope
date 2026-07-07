import type { TechnologyDefinition } from '../../types';

export const godaddyTechnologyDefinition = {
	id: "godaddy",
	name: "GoDaddy",
	website: "https://www.godaddy.com",
	description: "GoDaddy is used as a web host and domain registrar.",
	icon: "GoDaddy.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "godaddy:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.domaincontrol\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "godaddy:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.domaincontrol\\.com", "i"),
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
