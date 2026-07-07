import type { TechnologyDefinition } from '../../types';

export const applovinTechnologyDefinition = {
	id: "applovin",
	name: "APPLOVIN",
	website: "https://www.applovin.com/",
	description: "APPLOVIN is an advertising platform.",
	icon: "APPLOVIN.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "applovin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.applovin\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
