import type { TechnologyDefinition } from '../../types';

export const xzeroAnalyticsTechnologyDefinition = {
	id: "xzero-analytics",
	name: "Xzero Analytics",
	website: "https://analytics.xzero.co.uk",
	description: "Xzero Analytics is a tool for monitoring user journeys, analysing visitor sessions, gathering heatmaps, and more, enabling the observation and evolution of site traffic.",
	icon: "XZeroAnalytics.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "xzero-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.xzero\\.co\\.uk"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xzero-analytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "xzero-analytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
