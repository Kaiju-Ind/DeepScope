import type { TechnologyDefinition } from '../../types';

export const diamondcdnTechnologyDefinition = {
	id: "diamondcdn",
	name: "DiamondCDN",
	website: "https://diamondcdn.com",
	description: "DiamondCDN is a CDN with DDoS mitigation for free.",
	icon: "DiamondCDN.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "diamondcdn:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^DiamondCDN$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "diamondcdn:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^diamondcdn$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
