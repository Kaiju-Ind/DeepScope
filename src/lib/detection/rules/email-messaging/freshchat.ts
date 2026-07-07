import type { TechnologyDefinition } from '../../types';

export const freshchatTechnologyDefinition = {
	id: "freshchat",
	name: "Freshchat",
	website: "https://www.freshworks.com/live-chat-software/",
	description: "Freshchat is a cloud-hosted live messaging and engagement application.",
	icon: "Freshchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "freshchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wchat\\.freshchat\\.com\\/js\\/widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "freshchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "Freshbots",
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
