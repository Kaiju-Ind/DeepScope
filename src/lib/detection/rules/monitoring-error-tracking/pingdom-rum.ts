import type { TechnologyDefinition } from '../../types';

export const pingdomRumTechnologyDefinition = {
	id: "pingdom-rum",
	name: "Pingdom RUM",
	website: "https://www.pingdom.com/real-user-monitoring/",
	description: "Pingdom RUM(Real User Monitoring) is a feature of the Pingdom website monitoring and performance testing service. RUM enables you to collect and analyse data on how real users are experiencing your website.",
	icon: "Pingdom.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "pingdom-rum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rum-static\\.pingdom\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pingdom-rum:jsGlobal:1",
			kind: "jsGlobal",
			property: "_prum",
			description: "Page-owned global matches a known technology marker.",
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
