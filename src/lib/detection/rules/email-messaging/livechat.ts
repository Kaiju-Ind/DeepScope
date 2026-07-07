import type { TechnologyDefinition } from '../../types';

export const livechatTechnologyDefinition = {
	id: "livechat",
	name: "LiveChat",
	website: "https://www.livechat.com/",
	description: "LiveChat is an online customer service software with online chat, help desk software, and web analytics capabilities.",
	icon: "LiveChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "livechat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.livechatinc\\.com\\/.*tracking\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "livechat:jsGlobal:1",
			kind: "jsGlobal",
			property: "LiveChatWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
