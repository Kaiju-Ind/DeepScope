import type { TechnologyDefinition } from '../../types';

export const adverticumTechnologyDefinition = {
	id: "adverticum",
	name: "Adverticum",
	website: "https://adverticum.net",
	description: "Adverticum is the developer and operator of Hungary's market leading online ad serving solution, the Adverticum AdServer.",
	icon: "Adverticum.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adverticum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adverticum\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adverticum:dom:1",
			kind: "dom",
			selector: "a[href*='ad.adverticum.net'], div.goAdverticum",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
