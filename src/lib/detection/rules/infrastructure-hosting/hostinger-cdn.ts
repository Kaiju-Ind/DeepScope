import type { TechnologyDefinition } from '../../types';

export const hostingerCdnTechnologyDefinition = {
	id: "hostinger-cdn",
	name: "Hostinger CDN",
	website: "https://www.hostinger.com",
	description: "Hostinger Content Delivery Network (CDN).",
	icon: "Hostinger.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hostinger-cdn:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("hcdn", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
