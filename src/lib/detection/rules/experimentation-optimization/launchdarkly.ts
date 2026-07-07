import type { TechnologyDefinition } from '../../types';

export const launchdarklyTechnologyDefinition = {
	id: "launchdarkly",
	name: "LaunchDarkly",
	website: "https://launchdarkly.com",
	description: "LaunchDarkly is a continuous delivery and feature flags as a service platform that integrates into a company's current development cycle.",
	icon: "LaunchDarkly.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "launchdarkly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\.|\\-)launchdarkly(?:\\.com\\/|\\-sdk\\.)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "launchdarkly:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("app\\.launchdarkly\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "launchdarkly:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("events\\.launchdarkly\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "launchdarkly:dom:3",
			kind: "dom",
			selector: "link[href*='.launchdarkly.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "launchdarkly:jsGlobal:4",
			kind: "jsGlobal",
			property: "DDC.WS.state",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "launchdarkly:jsGlobal:5",
			kind: "jsGlobal",
			property: "launchDarkly",
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
