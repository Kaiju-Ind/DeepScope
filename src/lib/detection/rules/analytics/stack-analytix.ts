import type { TechnologyDefinition } from '../../types';

export const stackAnalytixTechnologyDefinition = {
	id: "stack-analytix",
	name: "Stack Analytix",
	website: "https://www.stackanalytix.com",
	description: "Stack Analytix offers heatmaps, session recording, conversion analysis and user engagement tools.",
	icon: "Stack Analytix.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "stack-analytix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.stackanalytix\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stack-analytix:jsGlobal:1",
			kind: "jsGlobal",
			property: "stackAnalysis",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
