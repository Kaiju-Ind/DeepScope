import type { TechnologyDefinition } from '../../types';

export const chatsimpleTechnologyDefinition = {
	id: "chatsimple",
	name: "Chatsimple",
	website: "https://www.chatsimple.ai",
	description: "Chatsimple provides AI chatbots for sales and support, facilitating lead generation and multilingual customer assistance.",
	icon: "Chatsimple.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "chatsimple:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.chatsimple\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatsimple:jsGlobal:1",
			kind: "jsGlobal",
			property: "chatsimpleCoPilot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
