import type { TechnologyDefinition } from '../../types';

export const drozBotTechnologyDefinition = {
	id: "droz-bot",
	name: "Droz Bot",
	website: "https://meudroz.com/droz-bot/",
	description: "Droz Bot is a multi-channel, customisable chatbot designed to help brands provide customer service across commonly used social apps.",
	icon: "Droz.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "droz-bot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat-app\\.meudroz\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
