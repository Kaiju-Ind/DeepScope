import type { TechnologyDefinition } from '../../types';

export const chatbotTechnologyDefinition = {
	id: "chatbot",
	name: "ChatBot",
	website: "https://www.chatbot.com",
	description: "ChatBot is a framework for AI chatbots, enabling users to create chatbots for various web services.",
	icon: "ChatBot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.chatbot\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
