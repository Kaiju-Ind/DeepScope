import type { TechnologyDefinition } from '../../types';

export const launchrockTechnologyDefinition = {
	id: "launchrock",
	name: "Launchrock",
	website: "https://www.launchrock.com",
	description: "Launchrock is an online tool designed to help capture email addresses and create online product launching events.",
	icon: "Launchrock.svg",
	categories: [
		"platform-cms-builder",
		"email-messaging",
	],
	rules: [
		{
			id: "launchrock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("builder\\.launchrock\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "launchrock:jsGlobal:1",
			kind: "jsGlobal",
			property: "lrIgnition",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "launchrock:jsGlobal:2",
			kind: "jsGlobal",
			property: "lrLoadedJs",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "launchrock:jsGlobal:3",
			kind: "jsGlobal",
			property: "lrSiteRenderingData.apiEndpoint",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "launchrock:jsGlobal:4",
			kind: "jsGlobal",
			property: "lrSiteSettingAsBoolean",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "launchrock:jsGlobal:5",
			kind: "jsGlobal",
			property: "lrignition",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
