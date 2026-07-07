import type { TechnologyDefinition } from '../../types';

export const pubstackTechnologyDefinition = {
	id: "pubstack",
	name: "Pubstack",
	website: "https://www.pubstack.io",
	description: "Pubstack is a platform that provides tools for managing and optimizing digital advertising, offering solutions for real-time analytics, ad performance monitoring, and revenue optimization.",
	icon: "Pubstack.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pubstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pubstack\\.io\\/"),
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
