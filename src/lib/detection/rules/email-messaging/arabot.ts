import type { TechnologyDefinition } from '../../types';

export const arabotTechnologyDefinition = {
	id: "arabot",
	name: "Arabot",
	website: "https://arabot.io",
	description: "Arabot is a no-code chatbot platform designed to automate customer interactions and service fulfillment at scale.",
	icon: "Arabot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "arabot:jsGlobal:0",
			kind: "jsGlobal",
			property: "arabotChatScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arabot:jsGlobal:1",
			kind: "jsGlobal",
			property: "arabotSelector",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arabot:jsGlobal:2",
			kind: "jsGlobal",
			property: "injectArabotScript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
