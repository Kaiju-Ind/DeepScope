import type { TechnologyDefinition } from '../../types';

export const happyfoxLiveChatTechnologyDefinition = {
	id: "happyfox-live-chat",
	name: "HappyFox Live Chat",
	website: "https://www.happyfox.com/live-chat",
	description: "HappyFox is a help desk ticketing system that is hosted on cloud, supporting multiple customer support channels like email, voice and live chat.",
	icon: "HappyFox.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "happyfox-live-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.happyfoxchat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "happyfox-live-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "HappyFoxChatObject",
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
