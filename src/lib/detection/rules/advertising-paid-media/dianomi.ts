import type { TechnologyDefinition } from '../../types';

export const dianomiTechnologyDefinition = {
	id: "dianomi",
	name: "Dianomi",
	website: "https://www.dianomi.com",
	description: "Dianomi is an advertiser campaign management software for financial services, premium lifestyle, technology and corporate sectors.",
	icon: "Dianomi.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "dianomi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dianomi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dianomi:dom:1",
			kind: "dom",
			selector: "iframe[src*='.dianomi.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
