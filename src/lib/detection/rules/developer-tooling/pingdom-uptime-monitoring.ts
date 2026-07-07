import type { TechnologyDefinition } from '../../types';

export const pingdomUptimeMonitoringTechnologyDefinition = {
	id: "pingdom-uptime-monitoring",
	name: "Pingdom Uptime Monitoring",
	website: "https://www.pingdom.com/product/uptime-monitoring/",
	description: "Pingdom Uptime Monitoring is a feature provided by the Pingdom website monitoring and performance testing service. It allows you to monitor the uptime and availability of your website.",
	icon: "Pingdom.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "pingdom-uptime-monitoring:meta:0",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^Pingdom Public Reports Overview$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pingdom-uptime-monitoring:meta:1",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^pingdom public reports overview$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
