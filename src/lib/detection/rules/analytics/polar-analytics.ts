import type { TechnologyDefinition } from '../../types';

export const polarAnalyticsTechnologyDefinition = {
	id: "polar-analytics",
	name: "Polar Analytics",
	website: "https://www.polaranalytics.com",
	description: "Polar Analytics is an intelligent marketing dashboard built for direct-to-consumer brands.",
	icon: "PolarAnalytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "polar-analytics:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn-production\\.polaranalytics\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
