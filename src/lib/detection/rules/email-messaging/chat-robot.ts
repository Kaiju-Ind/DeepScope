import type { TechnologyDefinition } from '../../types';

export const chatRobotTechnologyDefinition = {
	id: "chat-robot",
	name: "Chat Robot",
	website: "https://chat-robot.com",
	description: "Chat Robot is a live chat system.",
	icon: "ChatRobot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chat-robot:jsGlobal:0",
			kind: "jsGlobal",
			property: "CRChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chat-robot:jsGlobal:1",
			kind: "jsGlobal",
			property: "_crChat.browserInfo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
