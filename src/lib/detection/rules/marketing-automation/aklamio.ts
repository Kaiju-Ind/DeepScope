import type { TechnologyDefinition } from '../../types';

export const aklamioTechnologyDefinition = {
	id: "aklamio",
	name: "Aklamio",
	website: "https://www.aklamio.com",
	description: "Aklamio is a solution for enterprise level referral marketing and customer incentivisation.",
	icon: "Aklamio.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "aklamio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.aklamio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aklamio:dom:1",
			kind: "dom",
			selector: "a[href*='.aklamio.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aklamio:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.aklamio\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
