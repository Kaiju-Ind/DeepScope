import type { TechnologyDefinition } from '../../types';

export const convincelyTechnologyDefinition = {
	id: "convincely",
	name: "Convincely",
	website: "https://www.convincely.com",
	description: "Convincely is a platform designed to rapidly launch and optimize personalized sales funnels for businesses.",
	icon: "Convincely.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "convincely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.convincely\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convincely:jsGlobal:1",
			kind: "jsGlobal",
			property: "convincely3.analyticsService",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
