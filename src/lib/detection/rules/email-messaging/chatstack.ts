import type { TechnologyDefinition } from '../../types';

export const chatstackTechnologyDefinition = {
	id: "chatstack",
	name: "ChatStack",
	website: "https://www.chatstack.com",
	description: "ChatStack is a self-hosted live chat software for websites.",
	icon: "ChatStack.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatstack:jsGlobal:0",
			kind: "jsGlobal",
			property: "Chatstack.chatState",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatstack:jsGlobal:1",
			kind: "jsGlobal",
			property: "Chatstack.server",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
