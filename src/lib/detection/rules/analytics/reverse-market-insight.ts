import type { TechnologyDefinition } from '../../types';

export const reverseMarketInsightTechnologyDefinition = {
	id: "reverse-market-insight",
	name: "Reverse Market Insight",
	website: "https://www.rminsight.net",
	description: "Reverse Market Insight is a provider of performance data and analytics solutions for the reverse mortgage industry.",
	icon: "ReverseMarketInsight.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "reverse-market-insight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.rminsight\\.net"),
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
