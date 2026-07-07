import type { TechnologyDefinition } from '../../types';

export const splunkRumTechnologyDefinition = {
	id: "splunk-rum",
	name: "Splunk RUM",
	website: "https://www.splunk.com/en_us/observability/real-user-monitoring.html",
	description: "Splunk RUM is a real-time, front-end user monitoring and troubleshooting.",
	icon: "Splunk.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "splunk-rum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("browser\\.plumbr\\.io\\/pa(?:-early)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "splunk-rum:jsGlobal:1",
			kind: "jsGlobal",
			property: "PLUMBR._core.selfURL",
			valuePattern: new RegExp("browser\\.plumbr\\.io\\/pa(?:-early)?\\.js"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "splunk-rum:jsGlobal:2",
			kind: "jsGlobal",
			property: "PLUMBR._core.version",
			valuePattern: new RegExp("^([\\d\\.]+).+$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
