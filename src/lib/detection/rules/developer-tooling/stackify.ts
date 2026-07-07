import type { TechnologyDefinition } from '../../types';

export const stackifyTechnologyDefinition = {
	id: "stackify",
	name: "Stackify",
	website: "https://stackify.com",
	description: "Stackify offers the only solution that fully integrates application performance monitoring with errors and logs.",
	icon: "Stackify.svg",
	categories: [
		"developer-tooling",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "stackify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stackify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
