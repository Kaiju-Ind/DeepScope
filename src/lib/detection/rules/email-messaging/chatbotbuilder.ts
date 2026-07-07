import type { TechnologyDefinition } from '../../types';

export const chatbotbuilderTechnologyDefinition = {
	id: "chatbotbuilder",
	name: "ChatBotBuilder",
	website: "https://www.chatbotbuilder.ai",
	description: "ChatBotBuilderAI is an AI chatbot development platform that enables deployment of custom GPT-powered chatbots.",
	icon: "ChatBotBuilder.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatbotbuilder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.chatgptbuilder\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
