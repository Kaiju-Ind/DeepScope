import type { TechnologyDefinition } from '../../types';

export const assoconnectTechnologyDefinition = {
	id: "assoconnect",
	name: "Assoconnect",
	website: "https://www.assoconnect.com",
	description: "Assoconnect is an association management software platform that provides tools for membership management, event organization, communication, and administrative operations.",
	icon: "Assoconnect.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "assoconnect:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.assoconnect\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "assoconnect:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^AssoConnect$", "i"),
			description: "Meta tag matches a known technology marker.",
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
