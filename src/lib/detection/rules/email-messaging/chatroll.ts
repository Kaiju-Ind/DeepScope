import type { TechnologyDefinition } from '../../types';

export const chatrollTechnologyDefinition = {
	id: "chatroll",
	name: "Chatroll",
	website: "https://chatroll.com",
	description: "Chatroll is a chat platform designed for live events, enabling real-time audience engagement and interaction.",
	icon: "Chatroll.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatroll:dom:0",
			kind: "dom",
			selector: "iframe[src*='chatroll.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
