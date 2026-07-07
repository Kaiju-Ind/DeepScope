import type { TechnologyDefinition } from '../../types';

export const convertobotTechnologyDefinition = {
	id: "convertobot",
	name: "ConvertoBot",
	website: "https://convertobot.com",
	description: "ConvertoBot is a chatbot and conversational marketing tool.",
	icon: "ConvertoBot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "convertobot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.convertobot\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convertobot:jsGlobal:1",
			kind: "jsGlobal",
			property: "botUrl",
			valuePattern: new RegExp("app\\.convertobot\\.com"),
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
