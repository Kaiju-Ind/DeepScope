import type { TechnologyDefinition } from '../../types';

export const clickdeskTechnologyDefinition = {
	id: "clickdesk",
	name: "ClickDesk",
	website: "https://www.clickdesk.com",
	description: "ClickDesk is a live chat and online engagement software that enables real-time interaction with website visitors.",
	icon: "ClickDesk.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "clickdesk:jsGlobal:0",
			kind: "jsGlobal",
			property: "CLICKDESK_CHAT_WINDOW_UI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clickdesk:jsGlobal:1",
			kind: "jsGlobal",
			property: "CLICKDESK_LIVECHAT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clickdesk:jsGlobal:2",
			kind: "jsGlobal",
			property: "CLICKDESK_Live_Chat",
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
