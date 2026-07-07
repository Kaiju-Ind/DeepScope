import type { TechnologyDefinition } from '../../types';

export const azureMonitorTechnologyDefinition = {
	id: "azure-monitor",
	name: "Azure Monitor",
	website: "https://azure.microsoft.com/en-us/services/monitor",
	description: "Azure Monitor collects monitoring telemetry from a variety of on-premises and Azure sources. Azure Monitor helps you maximise the availability and performance of your applications and services.",
	icon: "Azure.svg",
	categories: [
		"analytics",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "azure-monitor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.monitor\\.azure\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "azure-monitor:dom:1",
			kind: "dom",
			selector: "link[href*='js.monitor.azure.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "azure-monitor:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("js\\.monitor\\.azure\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "azure-monitor:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("js\\.monitor\\.azure\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"azure",
	],
} as const satisfies TechnologyDefinition;
