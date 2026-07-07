import type { TechnologyDefinition } from '../../types';

export const fitAnalyticsTechnologyDefinition = {
	id: "fit-analytics",
	name: "Fit Analytics",
	website: "https://www.fitanalytics.com",
	description: "Fit Analytics is a platform that provides clothing size recommendations for online customers by measuring individual dimensions via webcams.",
	icon: "Fit Analytics.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "fit-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fitanalytics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fit-analytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "FitAnalyticsWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fit-analytics:jsGlobal:2",
			kind: "jsGlobal",
			property: "_fitAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
