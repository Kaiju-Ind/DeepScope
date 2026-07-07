import type { TechnologyDefinition } from '../../types';

export const antsomiCdp365TechnologyDefinition = {
	id: "antsomi-cdp-365",
	name: "Antsomi CDP 365",
	website: "https://www.antsomi.com",
	description: "Antsomi CDP 365 is an AI-enabled customer data platform from Southeast Asia.",
	icon: "Antsomi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "antsomi-cdp-365:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cdp\\.asia\\/"),
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
