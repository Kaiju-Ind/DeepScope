import type { TechnologyDefinition } from '../../types';

export const chatbaseTechnologyDefinition = {
	id: "chatbase",
	name: "Chatbase",
	website: "https://www.chatbase.co",
	description: "Chatbase is an AI chatbot builder, it trains ChatGPT on your data and lets you add a chat widget to your website.",
	icon: "Chatbase.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatbase:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.chatbase\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "chatbase:jsGlobal:1",
			kind: "jsGlobal",
			property: "chatbaseConfig.chatbotId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatbase:jsGlobal:2",
			kind: "jsGlobal",
			property: "embedChatbaseChatbot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatbase:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^chatbase_anon_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
