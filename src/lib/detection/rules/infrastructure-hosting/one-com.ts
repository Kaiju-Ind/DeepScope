import type { TechnologyDefinition } from '../../types';

export const oneComTechnologyDefinition = {
	id: "one-com",
	name: "One.com",
	website: "https://www.one.com",
	description: "One.com is a Denmark-based company offering bargain-priced WordPress and shared web hosting plans.",
	icon: "One.com.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "one-com:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.one\\.com", "i"),
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
