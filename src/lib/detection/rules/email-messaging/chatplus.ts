import type { TechnologyDefinition } from '../../types';

export const chatplusTechnologyDefinition = {
	id: "chatplus",
	name: "ChatPlus",
	website: "https://chatplus.jp",
	description: "ChatPlus is a provider of chat and chatbot tool with (or without) AI in Japan and abroad.",
	icon: "ChatPlus.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatplus:jsGlobal:0",
			kind: "jsGlobal",
			property: "ChatplusAction.addAgentTag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatplus:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChatplusAppScript.getLead",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatplus:jsGlobal:2",
			kind: "jsGlobal",
			property: "ChatplusScript.focusPrompt",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatplus:jsGlobal:3",
			kind: "jsGlobal",
			property: "jpChatplusOnComplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatplus:jsGlobal:4",
			kind: "jsGlobal",
			property: "jp_chatplus_app_accessTime",
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
