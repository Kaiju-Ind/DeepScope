import type { TechnologyDefinition } from '../../types';

export const clickchatTechnologyDefinition = {
	id: "clickchat",
	name: "ClickChat",
	website: "https://click-chat.ru",
	description: "Click Chat is a web-based solution that enables chat installation on any website, facilitating real-time communication and customer engagement.",
	icon: "ClickChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "clickchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.click-chat\\.ru"),
			description: "Script source URL matches a known technology marker.",
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
