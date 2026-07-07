import type { TechnologyDefinition } from '../../types';

export const snatchbotTechnologyDefinition = {
	id: "snatchbot",
	name: "SnatchBot",
	website: "https://snatchbot.me",
	description: "SnatchBot is a cloud-based AI chatbot platform.",
	icon: "SnatchBot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "snatchbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("account\\.snatchbot\\.me"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snatchbot:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("account\\.snatchbot\\.me"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
