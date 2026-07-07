import type { TechnologyDefinition } from '../../types';

export const thinkingChatTechnologyDefinition = {
	id: "thinking-chat",
	name: "Thinking Chat",
	website: "https://thinkingchat.com",
	description: "Thinking Chat is an automated lead capture and chat solution.",
	icon: "ThinkingChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "thinking-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.thinkingchat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
