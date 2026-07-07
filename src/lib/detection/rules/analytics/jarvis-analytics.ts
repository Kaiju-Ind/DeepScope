import type { TechnologyDefinition } from '../../types';

export const jarvisAnalyticsTechnologyDefinition = {
	id: "jarvis-analytics",
	name: "Jarvis Analytics",
	website: "https://www.jarvisanalytics.com",
	description: "Jarvis Analytics is a dental analytics platform that collects, processes, and visualizes dental data to support clinical decision-making and operational insights.",
	icon: "JarvisAnalytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "jarvis-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("schedule\\.jarvisanalytics\\.com"),
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
