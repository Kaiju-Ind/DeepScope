import type { TechnologyDefinition } from '../../types';

export const grooveTechnologyDefinition = {
	id: "groove",
	name: "Groove",
	website: "https://www.groovehq.com",
	description: "Groove is a help desk software offering a shared inbox, knowledge base, and chat features.",
	icon: "Groove.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "groove:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.groovehq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "groove:jsGlobal:1",
			kind: "jsGlobal",
			property: "Groove",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "groove:jsGlobal:2",
			kind: "jsGlobal",
			property: "GrooveWidget",
			description: "Page-owned global matches a known technology marker.",
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
