import type { TechnologyDefinition } from '../../types';

export const chatlabTechnologyDefinition = {
	id: "chatlab",
	name: "ChatLab",
	website: "https://www.chatlab.com",
	description: "ChatLab is an AI-powered customer service agent that operates as a chatbot on websites to assist with user inquiries.",
	icon: "ChatLab.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatlab:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.chatlab\\.com"),
			description: "Script source URL matches a known technology marker.",
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
