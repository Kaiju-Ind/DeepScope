import type { TechnologyDefinition } from '../../types';

export const botstarTechnologyDefinition = {
	id: "botstar",
	name: "BotStar",
	website: "https://botstar.com",
	description: "BotStar is a platform for creating chatbots for websites and messaging applications.",
	icon: "BotStar.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botstar:jsGlobal:0",
			kind: "jsGlobal",
			property: "BotStar.appId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botstar:jsGlobal:1",
			kind: "jsGlobal",
			property: "BotStarApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botstar:jsGlobal:2",
			kind: "jsGlobal",
			property: "BotStarUp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
