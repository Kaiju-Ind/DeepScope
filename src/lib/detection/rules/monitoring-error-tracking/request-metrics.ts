import type { TechnologyDefinition } from '../../types';

export const requestMetricsTechnologyDefinition = {
	id: "request-metrics",
	name: "Request Metrics",
	website: "https://requestmetrics.com",
	description: "Request Metrics is a tool that tracks and analyzes website performance, measuring speed, uptime, and overall responsiveness.",
	icon: "RequestMetrics.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "request-metrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.requestmetrics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "request-metrics:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.requestmetrics\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
