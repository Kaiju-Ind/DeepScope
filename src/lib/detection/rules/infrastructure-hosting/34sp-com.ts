import type { TechnologyDefinition } from '../../types';

export const technology34spComTechnologyDefinition = {
	id: "34sp-com",
	name: "34SP.com",
	website: "https://www.34sp.com",
	description: "34SP.com specialises in website hosting, discount domain names, low cost VPS servers and dedicated servers.",
	icon: "34SP.com.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "34sp-com:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns(?:\\d+)?\\.34sp\\.com", "i"),
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
