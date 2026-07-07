import type { TechnologyDefinition } from '../../types';

export const versatailorTechnologyDefinition = {
	id: "versatailor",
	name: "VersaTailor",
	website: "https://versatailor.com",
	description: "VersaTailor is a web analytics tool for online businesses that offers hour-by-hour filtering and the ability to exclude authenticated users from analytics.",
	icon: "VersaTailor.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "versatailor:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("versatailor\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "versatailor:jsGlobal:1",
			kind: "jsGlobal",
			property: "versatailor",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
