import type { TechnologyDefinition } from '../../types';

export const reditusTechnologyDefinition = {
	id: "reditus",
	name: "Reditus",
	website: "https://www.getreditus.com",
	description: "Reditus is a partner management tool for B2B SaaS companies.",
	icon: "Reditus.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "reditus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getreditus\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
