import type { TechnologyDefinition } from '../../types';

export const appdynamicsTechnologyDefinition = {
	id: "appdynamics",
	name: "AppDynamics",
	website: "https://appdynamics.com",
	description: "AppDynamics is an application performance management (APM) and IT operations analytics (ITOA) company based in San Francisco.",
	icon: "AppDynamics.png",
	categories: [
		"analytics",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "appdynamics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("adrum"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appdynamics:jsGlobal:1",
			kind: "jsGlobal",
			property: "ADRUM.conf.agentVer",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
		cpe: "cpe:2.3:a:cisco:appdynamics:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
