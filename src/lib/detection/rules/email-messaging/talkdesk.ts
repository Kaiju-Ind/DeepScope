import type { TechnologyDefinition } from '../../types';

export const talkdeskTechnologyDefinition = {
	id: "talkdesk",
	name: "Talkdesk",
	website: "https://www.talkdesk.com",
	description: "Talkdesk is a platform providing modern AI-powered customer service solutions.",
	icon: "Talkdesk.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "talkdesk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.talkdeskapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "talkdesk:jsGlobal:1",
			kind: "jsGlobal",
			property: "TalkdeskChatSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "talkdesk:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkTalkdeskChatSDK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
