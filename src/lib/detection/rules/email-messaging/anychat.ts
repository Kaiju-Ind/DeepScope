import type { TechnologyDefinition } from '../../types';

export const anychatTechnologyDefinition = {
	id: "anychat",
	name: "AnyChat",
	website: "https://anychat.one",
	description: "AnyChat is a real-time conversation system designed to enable communication and message exchange between users.",
	icon: "AnyChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "anychat:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.anychat\\.one"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "anychat:jsGlobal:1",
			kind: "jsGlobal",
			property: "anychat.CHATBOX_FRAME",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "anychat:jsGlobal:2",
			kind: "jsGlobal",
			property: "anychatWidget",
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
