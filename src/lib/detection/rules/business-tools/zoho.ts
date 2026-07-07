import type { TechnologyDefinition } from '../../types';

export const zohoTechnologyDefinition = {
	id: "zoho",
	name: "Zoho",
	website: "https://www.zoho.com/",
	description: "Zoho is a web-based online office suite.",
	icon: "Zoho.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "zoho:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.zoho\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
