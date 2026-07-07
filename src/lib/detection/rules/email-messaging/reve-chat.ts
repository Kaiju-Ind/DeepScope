import type { TechnologyDefinition } from '../../types';

export const reveChatTechnologyDefinition = {
	id: "reve-chat",
	name: "REVE Chat",
	website: "https://www.revechat.com",
	description: "REVE Chat is an AI-powered platform that automates and enhances customer service interactions through chatbots and live chat support.",
	icon: "REVEChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "reve-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.revechat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reve-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "$REVECHAT_MEDIA_GALLERY",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
