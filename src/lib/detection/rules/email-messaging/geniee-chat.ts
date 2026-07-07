import type { TechnologyDefinition } from '../../types';

export const genieeChatTechnologyDefinition = {
	id: "geniee-chat",
	name: "Geniee Chat",
	website: "https://chamo-chat.com",
	description: "Geniee Chat is a chat-based web customer service platform.",
	icon: "GenieeChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "geniee-chat:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.chamo-chat\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "geniee-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "GenooCSS.add",
			description: "Page-owned global matches a known technology marker.",
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
