import type { TechnologyDefinition } from '../../types';

export const zendeskChatTechnologyDefinition = {
	id: "zendesk-chat",
	name: "Zendesk Chat",
	website: "https://www.zendesk.com/service/messaging/live-chat-software/",
	description: "Zendesk Chat is a live chat and communication widget.",
	icon: "Zendesk Chat.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zendesk-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("v2\\.zopim\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
