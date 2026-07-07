import type { TechnologyDefinition } from '../../types';

export const exitBeeTechnologyDefinition = {
	id: "exit-bee",
	name: "Exit Bee",
	website: "https://www.exitbee.com",
	description: "Exit Bee is a platform that uses pattern recognition and machine learning to detect when users disengage from website content and are more likely to interact with ad campaigns.",
	icon: "ExitBee.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "exit-bee:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.exitbee\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
