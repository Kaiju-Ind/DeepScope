import type { TechnologyDefinition } from '../../types';

export const bugsnagTechnologyDefinition = {
	id: "bugsnag",
	name: "BugSnag",
	website: "https://bugsnag.com",
	description: "Bugsnag is a cross-platform error monitoring, reporting, and resolution software.",
	icon: "BugSnag.png",
	categories: [
		"monitoring-error-tracking",
		"analytics",
		"developer-tooling",
	],
	rules: [
		{
			id: "bugsnag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/bugsnag.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bugsnag:jsGlobal:1",
			kind: "jsGlobal",
			property: "Bugsnag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bugsnag:jsGlobal:2",
			kind: "jsGlobal",
			property: "bugsnag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bugsnag:jsGlobal:3",
			kind: "jsGlobal",
			property: "bugsnagClient",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
