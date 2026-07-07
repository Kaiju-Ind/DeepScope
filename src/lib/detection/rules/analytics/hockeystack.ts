import type { TechnologyDefinition } from '../../types';

export const hockeystackTechnologyDefinition = {
	id: "hockeystack",
	name: "HockeyStack",
	website: "https://hockeystack.com",
	description: "HockeyStack is a San Francisco-based analytics and attribution tool for B2B companies.",
	icon: "HockeyStack.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "hockeystack:jsGlobal:0",
			kind: "jsGlobal",
			property: "HockeyStack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hockeystack:jsGlobal:1",
			kind: "jsGlobal",
			property: "hsscript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
