import type { TechnologyDefinition } from '../../types';

export const palomaTechnologyDefinition = {
	id: "paloma",
	name: "Paloma",
	website: "https://www.getpaloma.com",
	description: "Paloma helps ecommerce businesses sell directly to customers in messaging channels, with automated personal shopping conversations.",
	icon: "Paloma.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "paloma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getpaloma\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paloma:jsGlobal:1",
			kind: "jsGlobal",
			property: "Paloma.createCookie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
