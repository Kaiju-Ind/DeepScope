import type { TechnologyDefinition } from '../../types';

export const allInklTechnologyDefinition = {
	id: "all-inkl",
	name: "ALL-INKL",
	website: "https://all-inkl.com",
	description: "ALL-INKL is a German-based web hosting provider that promises to offer high-performance services for fair prices.",
	icon: "ALL-INKL.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "all-inkl:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.kasserver\\.com", "i"),
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
