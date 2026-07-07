import type { TechnologyDefinition } from '../../types';

export const docsbotTechnologyDefinition = {
	id: "docsbot",
	name: "DocsBot",
	website: "https://docsbot.ai",
	description: "DocsBot is an AI-powered chatbot that helps automate customer support and improve team productivity.",
	icon: "DocsBotAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "docsbot:jsGlobal:0",
			kind: "jsGlobal",
			property: "DocsBotAI.el",
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
