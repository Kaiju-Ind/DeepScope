import type { TechnologyDefinition } from '../../types';

export const joinItTechnologyDefinition = {
	id: "join-it",
	name: "Join It",
	website: "https://joinit.com",
	description: "Join It is a membership management platform that helps nonprofits, clubs, and growing organizations manage members, track payments, and streamline administrative tasks.",
	icon: "JoinIt.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "join-it:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.joinit\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
