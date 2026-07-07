import type { TechnologyDefinition } from '../../types';

export const pushbotsTechnologyDefinition = {
	id: "pushbots",
	name: "PushBots",
	website: "https://pushbots.com",
	description: "PushBots is a messaging platform that enables businesses to send and manage push notifications, in-app messages, and polls across mobile and desktop devices.",
	icon: "PushBots.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushbots:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pushbots\\.com"),
			description: "Script source URL matches a known technology marker.",
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
