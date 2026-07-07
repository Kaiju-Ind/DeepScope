import type { TechnologyDefinition } from '../../types';

export const bot9TechnologyDefinition = {
	id: "bot9",
	name: "Bot9",
	website: "https://bot9.ai",
	description: "Bot9 is an AI chatbot builder, tailored for customer support.",
	icon: "Bot9.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "bot9:jsGlobal:0",
			kind: "jsGlobal",
			property: "BOT9_DATA.bot9Id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bot9:jsGlobal:1",
			kind: "jsGlobal",
			property: "Bot9ChatbotInstance",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bot9:jsGlobal:2",
			kind: "jsGlobal",
			property: "bot9CopyCodeToClipboard",
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
