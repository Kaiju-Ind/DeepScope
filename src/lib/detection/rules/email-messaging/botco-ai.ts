import type { TechnologyDefinition } from '../../types';

export const botcoAiTechnologyDefinition = {
	id: "botco-ai",
	name: "Botco.ai",
	website: "https://botco.ai",
	description: "Botco.ai is a platform that provides generative AI chatbot solutions to support customer engagement, automate conversations, and deliver information across digital channels.",
	icon: "Botco.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botco-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.botco\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "botco-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "BotcoWebchat.Events",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
