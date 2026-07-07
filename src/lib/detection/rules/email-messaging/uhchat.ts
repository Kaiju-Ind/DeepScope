import type { TechnologyDefinition } from '../../types';

export const uhchatTechnologyDefinition = {
	id: "uhchat",
	name: "uhChat",
	website: "https://uhchat.net",
	description: "uhChat is a tool that enables the creation of an embedded chat box on websites for real-time communication.",
	icon: "uhChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "uhchat:jsGlobal:0",
			kind: "jsGlobal",
			property: "getuhchatCookie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uhchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "uhchatClick",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uhchat:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^uhchatrelock$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
