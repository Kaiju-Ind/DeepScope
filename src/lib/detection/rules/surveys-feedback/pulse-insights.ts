import type { TechnologyDefinition } from '../../types';

export const pulseInsightsTechnologyDefinition = {
	id: "pulse-insights",
	name: "Pulse Insights",
	website: "https://www.pulseinsights.com",
	description: "Pulse Insights is a customer feedback platform that helps enterprises gather and analyze insights to understand customer needs and improve decision-making.",
	icon: "PulseInsights.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "pulse-insights:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.pulseinsights\\.com"),
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
