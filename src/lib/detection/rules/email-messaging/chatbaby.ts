import type { TechnologyDefinition } from '../../types';

export const chatbabyTechnologyDefinition = {
	id: "chatbaby",
	name: "Chatbaby",
	website: "https://chatbaby.co",
	description: "Chatbaby is a service for creating custom ChatGPT chatbots tailored to website content.",
	icon: "Chatbaby.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatbaby:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chatbaby\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatbaby:jsGlobal:1",
			kind: "jsGlobal",
			property: "$$chatbaby",
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
