import type { TechnologyDefinition } from '../../types';

export const sensaiMetricsTechnologyDefinition = {
	id: "sensai-metrics",
	name: "Sensai Metrics",
	website: "https://sensaimetrics.io",
	description: "Sensai Metrics is a SAAS platform that analyzes ecommerce stores using various data science models to provide customers with actionable insights, predictions, and recommendations aimed at scaling their revenue.",
	icon: "SensaiMetrics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sensai-metrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sensaimetrics\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sensai-metrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "sensai.extensions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sensai-metrics:jsGlobal:2",
			kind: "jsGlobal",
			property: "sensaiTracker.extensions",
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
