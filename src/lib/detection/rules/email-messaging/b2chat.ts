import type { TechnologyDefinition } from '../../types';

export const b2chatTechnologyDefinition = {
	id: "b2chat",
	name: "B2Chat",
	website: "https://www.b2chat.io",
	description: "B2Chat is an all-in-one multi-channel platform that unites WhatsApp, Facebook, Instagram, Telegram, and LiveChat in a single interface.",
	icon: "B2Chat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "b2chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.b2chat\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "b2chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "b2chat_livechat_setup",
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
