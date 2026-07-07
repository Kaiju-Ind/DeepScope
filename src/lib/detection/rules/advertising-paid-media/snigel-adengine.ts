import type { TechnologyDefinition } from '../../types';

export const snigelAdengineTechnologyDefinition = {
	id: "snigel-adengine",
	name: "snigel AdEngine",
	website: "https://www.snigel.com/adengine/",
	description: "snigel AdEngine is a header bidding solution product from snigel.",
	icon: "snigel.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "snigel-adengine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:staging-)?cdn\\.snigelweb\\.com\\/adengine\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snigel-adengine:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("adengine\\.snigelweb\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
