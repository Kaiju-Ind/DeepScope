import type { TechnologyDefinition } from '../../types';

export const sakuraInternetTechnologyDefinition = {
	id: "sakura-internet",
	name: "Sakura Internet",
	website: "https://www.sakura.ad.jp",
	description: "Sakura Internet is a web hosting provider that has been operating for almost 30 years.",
	icon: "Sakura Internet.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "sakura-internet:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.gslbN\\.sakura\\.ne\\.jp", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "sakura-internet:dns:1",
			kind: "dns",
			valuePattern: new RegExp("tech\\.sakura\\.ad\\.jp", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
