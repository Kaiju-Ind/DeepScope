import type { TechnologyDefinition } from '../../types';

export const wakavPerformanceMonitoringTechnologyDefinition = {
	id: "wakav-performance-monitoring",
	name: "Wakav Performance Monitoring",
	website: "https://www.wakav.ir",
	description: "Wakav Performance Monitoring is a real user monitoring (RUM), Web/App performance and availability test platform.",
	icon: "Wakav Performance Monitoring.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "wakav-performance-monitoring:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rum\\.wakav\\.ir\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
