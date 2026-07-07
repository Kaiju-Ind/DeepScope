import type { TechnologyDefinition } from '../../types';

export const pureChatTechnologyDefinition = {
	id: "pure-chat",
	name: "Pure Chat",
	website: "https://www.purechat.com",
	description: "Pure Chat is a live chat solution for small to mid-sized teams.",
	icon: "Pure Chat.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "pure-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.purechat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pure-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "PCWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pure-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "purechatApi",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:purechat:pure_chat:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
