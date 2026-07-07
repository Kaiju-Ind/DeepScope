import type { TechnologyDefinition } from '../../types';

export const rocketChatTechnologyDefinition = {
	id: "rocket-chat",
	name: "Rocket.Chat",
	website: "https://rocket.chat",
	description: "Rocket. Chat is a communication hub that facilitates team collaboration and organizes conversations.",
	icon: "Rocket.Chat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "rocket-chat:jsGlobal:0",
			kind: "jsGlobal",
			property: "RocketChat.livechat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rocket-chat:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Rocket.Chat$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:rocket.chat:rocket.chat:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
