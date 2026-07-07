import type { TechnologyDefinition } from '../../types';

export const publyTechnologyDefinition = {
	id: "publy",
	name: "Publy",
	website: "http://ppc.publy.net",
	description: "Publy is a provider of solutions for publishers and advertisers.",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "publy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.publy\\.net\\/"),
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
