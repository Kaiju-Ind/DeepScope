import type { TechnologyDefinition } from '../../types';

export const vertaflowAnalyticsTechnologyDefinition = {
	id: "vertaflow-analytics",
	name: "VertaFlow Analytics",
	website: "https://vertaflow.io",
	description: "VertaFlow Analytics is a lightweight, cookie-free, first-party analytics pixel that tracks pageviews, clicks, scroll depth, and UTM campaigns, sending events to VertaFlow CRM.",
	icon: "VertaFlow.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "vertaflow-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vertaflow\\.io\\/v1\\/pixel\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
