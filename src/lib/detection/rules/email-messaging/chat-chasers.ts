import type { TechnologyDefinition } from '../../types';

export const chatChasersTechnologyDefinition = {
	id: "chat-chasers",
	name: "Chat Chasers",
	website: "https://www.chatchasers.com",
	description: "Chat Chasers is a chat system designed for car dealers to streamline communication with customers.",
	icon: "ChatChasers.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chat-chasers:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chatchasers\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chat-chasers:jsGlobal:1",
			kind: "jsGlobal",
			property: "_FetchChatChasersApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
