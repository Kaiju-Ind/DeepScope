import type { TechnologyDefinition } from '../../types';

export const crispLiveChatTechnologyDefinition = {
	id: "crisp-live-chat",
	name: "Crisp Live Chat",
	website: "https://crisp.chat/",
	description: "Crisp Live Chat is a live chat solution with free and paid options.",
	icon: "Crisp Live Chat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "crisp-live-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("client\\.crisp\\.chat\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crisp-live-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "$__CRISP_INCLUDED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crisp-live-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "$crisp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crisp-live-chat:jsGlobal:3",
			kind: "jsGlobal",
			property: "CRISP_WEBSITE_ID",
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
