import type { TechnologyDefinition } from '../../types';

export const dreamhostTechnologyDefinition = {
	id: "dreamhost",
	name: "DreamHost",
	website: "https://www.dreamhost.com",
	description: "DreamHost is a Los Angeles-based web hosting provider and domain name registrar.",
	icon: "DreamHost.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "dreamhost:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.dreamhost\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "dreamhost:dns:1",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.dreamhost\\.com", "i"),
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
