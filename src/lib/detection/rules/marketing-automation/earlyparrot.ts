import type { TechnologyDefinition } from '../../types';

export const earlyparrotTechnologyDefinition = {
	id: "earlyparrot",
	name: "EarlyParrot",
	website: "https://www.earlyparrot.com",
	description: "EarlyParrot is a referral marketing platform that supports coaches, course creators, and event hosts in expanding launches, webinars, and email lists through effective referral strategies.",
	icon: "EarlyParrot.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "earlyparrot:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.earlyparrot\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
