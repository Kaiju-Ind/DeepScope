import type { TechnologyDefinition } from '../../types';

export const quickchatAiTechnologyDefinition = {
	id: "quickchat-ai",
	name: "Quickchat AI",
	website: "https://quickchat.ai",
	description: "Quickchat AI is a no-code platform that lets you create custom AI Assistants for your business.",
	icon: "QuickchatAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "quickchat-ai:dom:0",
			kind: "dom",
			selector: "link[href*='/quickchat-files/appquickchat/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "quickchat-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "quickchat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quickchat-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "quickchat_busy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
