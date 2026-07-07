import type { TechnologyDefinition } from '../../types';

export const reiChatTechnologyDefinition = {
	id: "rei-chat",
	name: "REI Chat",
	website: "https://reichat.ai",
	description: "REI Chat is an AI-powered chatbot designed to understand and communicate within the real estate domain.",
	icon: "REIChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "rei-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.reichat\\.ai"),
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
