import type { TechnologyDefinition } from '../../types';

export const weekdoneTechnologyDefinition = {
	id: "weekdone",
	name: "Weekdone",
	website: "https://weekdone.com",
	description: "Weekdone is a tool for managers and leaders who want to get more insights into their teams and organizations and improve team collaboration and focus.",
	icon: "Weekdone.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "weekdone:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("weekdone\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
