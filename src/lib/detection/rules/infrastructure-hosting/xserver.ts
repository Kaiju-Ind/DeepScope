import type { TechnologyDefinition } from '../../types';

export const xserverTechnologyDefinition = {
	id: "xserver",
	name: "Xserver",
	website: "https://www.xserver.ne.jp",
	description: "Xserver engages in web hosting, web application and internet-related services.",
	icon: "Xserver.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "xserver:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.xserver\\.jp", "i"),
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
