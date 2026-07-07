import type { TechnologyDefinition } from '../../types';

export const risposeTechnologyDefinition = {
	id: "rispose",
	name: "Rispose",
	website: "https://rispose.com",
	description: "Rispose is a platform for building and embedding AI agents across websites and applications to automate support, sales, and user engagement through AI-powered assistants.",
	icon: "Rispose.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "rispose:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("rispose\\.com\\/cdn\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "rispose:jsGlobal:1",
			kind: "jsGlobal",
			property: "__risposeAgent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
