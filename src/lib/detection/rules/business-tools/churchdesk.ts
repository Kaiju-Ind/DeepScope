import type { TechnologyDefinition } from '../../types';

export const churchdeskTechnologyDefinition = {
	id: "churchdesk",
	name: "ChurchDesk",
	website: "https://churchdesk.com",
	description: "ChurchDesk is a church management software platform that supports administration, communication, scheduling, and record-keeping for religious organizations.",
	icon: "ChurchDesk.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "churchdesk:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.churchdesk\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "churchdesk:jsGlobal:1",
			kind: "jsGlobal",
			property: "nsChurchDesk",
			description: "Page-owned global matches a known technology marker.",
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
