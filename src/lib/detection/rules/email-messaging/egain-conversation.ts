import type { TechnologyDefinition } from '../../types';

export const egainConversationTechnologyDefinition = {
	id: "egain-conversation",
	name: "eGain Conversation",
	website: "https://www.egain.com",
	description: "eGain Conversation is a customer engagement platform that centralises and manages customer interactions across multiple channels, including chat, email, social media, and messaging apps.",
	icon: "eGain.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "egain-conversation:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.analytics-egain\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "egain-conversation:jsGlobal:1",
			kind: "jsGlobal",
			property: "egainDockChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
