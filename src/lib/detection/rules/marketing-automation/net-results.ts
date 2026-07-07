import type { TechnologyDefinition } from '../../types';

export const netResultsTechnologyDefinition = {
	id: "net-results",
	name: "NET-RESULTS",
	website: "https://www.net-results.com",
	description: "NET-RESULTS is a marketing automation platform for the data-driven marketer.",
	icon: "NET-RESULTS.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "net-results:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.net-results\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
