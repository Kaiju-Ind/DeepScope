import type { TechnologyDefinition } from '../../types';

export const remindTechnologyDefinition = {
	id: "remind",
	name: "Remind",
	website: "https://www.remind.com/chat",
	description: "Remind is a communication tool designed to connect educators with students and parents for timely updates and messages.",
	icon: "Remind.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "remind:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.remind\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
