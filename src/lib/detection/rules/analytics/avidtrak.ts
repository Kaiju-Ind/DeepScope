import type { TechnologyDefinition } from '../../types';

export const avidtrakTechnologyDefinition = {
	id: "avidtrak",
	name: "AvidTrak",
	website: "https://avidtrak.com",
	description: "AvidTrak is software for call tracking, recording, and analytics, designed to monitor phone performance, log conversations, and provide insights from call data.",
	icon: "AvidTrak.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "avidtrak:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("avidtrak\\.com\\/"),
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
