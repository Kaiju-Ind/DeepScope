import type { TechnologyDefinition } from '../../types';

export const askhandleTechnologyDefinition = {
	id: "askhandle",
	name: "AskHandle",
	website: "https://www.askhandle.com",
	description: "AskHandle is a platform that enables the creation of custom AI agents in minutes using user data and requirements, without requiring coding.",
	icon: "AskHandle.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "askhandle:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("dashboard\\.askhandle\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
