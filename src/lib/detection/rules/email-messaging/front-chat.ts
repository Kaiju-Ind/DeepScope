import type { TechnologyDefinition } from '../../types';

export const frontChatTechnologyDefinition = {
	id: "front-chat",
	name: "Front Chat",
	website: "https://front.com",
	description: "Front Chat is the live website chat solution that you can manage straight from your inbox.",
	icon: "Front Chat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "front-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/chat-assets\\.frontapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "front-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "FrontChat",
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
