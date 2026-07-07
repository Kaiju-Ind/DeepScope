import type { TechnologyDefinition } from '../../types';

export const rulerAnalyticsTechnologyDefinition = {
	id: "ruler-analytics",
	name: "Ruler Analytics",
	website: "https://www.ruleranalytics.com",
	description: "Ruler Analytics is a sales and marketing analytics tool designed to track performance, optimize campaigns, and provide data-driven insights.",
	icon: "RulerAnalytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ruler-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ruler\\.nyltx\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
