import type { TechnologyDefinition } from '../../types';

export const appleBusinessChatTechnologyDefinition = {
	id: "apple-business-chat",
	name: "Apple Business Chat",
	website: "https://developer.apple.com/documentation/businesschat",
	description: "Apple Business Chat is a service from Apple that allows your organization to directly chat with your customers using the Messages app.",
	icon: "Apple.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "apple-business-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/apple_business_chat_commerce\\/.+\\/apple_message_button_v([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "apple-business-chat:dom:1",
			kind: "dom",
			selector: "a[href*='bcrw.apple.com/business/api']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "apple-business-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "appleBusinessChat.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
