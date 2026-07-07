import type { TechnologyDefinition } from '../../types';

export const clientChatLiveTechnologyDefinition = {
	id: "client-chat-live",
	name: "Client Chat Live",
	website: "https://clientchatlive.com",
	description: "Client Chat Live is a tool that converts website visitors into clients through live chat functionality.",
	icon: "ClientChatLive.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "client-chat-live:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clientchatlive\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "client-chat-live:dom:1",
			kind: "dom",
			selector: "link[href*='platform.clientchatlive.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
