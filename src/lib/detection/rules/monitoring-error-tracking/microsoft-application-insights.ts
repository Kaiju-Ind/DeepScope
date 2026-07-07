import type { TechnologyDefinition } from '../../types';

export const microsoftApplicationInsightsTechnologyDefinition = {
	id: "microsoft-application-insights",
	name: "Microsoft Application Insights",
	website: "https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview",
	description: "Microsoft Application Insights is a feature of Azure Monitor that provides extensible application performance management (APM) and monitoring for live web apps.",
	icon: "Microsoft.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "microsoft-application-insights:jsGlobal:0",
			kind: "jsGlobal",
			property: "appInsights.SeverityLevel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-application-insights:jsGlobal:1",
			kind: "jsGlobal",
			property: "appInsights.addTelemetryInitializer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-application-insights:jsGlobal:2",
			kind: "jsGlobal",
			property: "appInsightsSDK",
			valuePattern: new RegExp("appInsights"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
