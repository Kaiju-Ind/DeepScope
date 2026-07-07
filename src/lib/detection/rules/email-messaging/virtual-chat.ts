import type { TechnologyDefinition } from '../../types';

export const virtualChatTechnologyDefinition = {
	id: "virtual-chat",
	name: "Virtual Chat",
	website: "https://www.virtual-chat.co.il",
	description: "Virtual Chat is a live-chat service for web sites.",
	icon: "Virtual Chat.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "virtual-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("virtual-chat\\.co\\.il\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
