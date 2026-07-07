import type { TechnologyDefinition } from '../../types';

export const fourthwallTechnologyDefinition = {
	id: "fourthwall",
	name: "Fourthwall",
	website: "https://fourthwall.com/",
	description: "Fourthwall helps to create and launch a branded website.",
	icon: "Fourthwall.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fourthwall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fourthwall\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fourthwall:jsGlobal:1",
			kind: "jsGlobal",
			property: "FourthwallAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fourthwall:jsGlobal:2",
			kind: "jsGlobal",
			property: "fourthwallTheme",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fourthwall:meta:3",
			kind: "meta",
			key: "version",
			valuePattern: new RegExp("^(.+)$", "i"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
