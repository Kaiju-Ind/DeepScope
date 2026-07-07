import type { TechnologyDefinition } from '../../types';

export const collectChatTechnologyDefinition = {
	id: "collect-chat",
	name: "Collect.chat",
	website: "https://collect.chat",
	description: "Collect.chat is an interactive chatbot that collects data from website visitors.",
	icon: "CollectChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "collect-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("collectorcdn\\.com\\/launcher\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "collect-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "CollectAlwaysOpen",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "collect-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "CollectChatLauncher",
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
