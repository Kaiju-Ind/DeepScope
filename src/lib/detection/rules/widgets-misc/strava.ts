import type { TechnologyDefinition } from '../../types';

export const stravaTechnologyDefinition = {
	id: "strava",
	name: "Strava",
	website: "https://www.strava.com",
	description: "Strava is a community-driven platform that enables users to track progress and support each other through shared motivation.",
	icon: "Strava.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "strava:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.strava\\.com"),
			description: "Script content contains a bounded technology signature.",
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
