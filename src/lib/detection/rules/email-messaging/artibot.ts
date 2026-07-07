import type { TechnologyDefinition } from '../../types';

export const artibotTechnologyDefinition = {
	id: "artibot",
	name: "ArtiBot",
	website: "https://www.artibot.ai",
	description: "ArtiBot is a chatbot designed for websites, providing automated assistance and customer engagement through conversational interactions.",
	icon: "ArtiBot.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "artibot:jsGlobal:0",
			kind: "jsGlobal",
			property: "ArtiBot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "artibot:jsGlobal:1",
			kind: "jsGlobal",
			property: "_artibotLauncherInitializer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "artibot:jsGlobal:2",
			kind: "jsGlobal",
			property: "artibotApi",
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
