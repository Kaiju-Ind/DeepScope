import type { TechnologyDefinition } from '../../types';

export const quixchatTechnologyDefinition = {
	id: "quixchat",
	name: "Quixchat",
	website: "https://quixchat.com",
	description: "Quixchat is a chat support widget for websites, facilitating real-time communication with visitors via WhatsApp, Facebook Messenger, Telegram, Viber, or Line.",
	icon: "Quixchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "quixchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.quixchat\\.com\\/assets\\/js\\/quixchat\\.js\\?ver=(\\d+\\.\\d+)(?:\\.\\d+)*"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quixchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "QuixChatClearChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
