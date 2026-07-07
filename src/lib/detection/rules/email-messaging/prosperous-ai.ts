import type { TechnologyDefinition } from '../../types';

export const prosperousAiTechnologyDefinition = {
	id: "prosperous-ai",
	name: "Prosperous AI",
	website: "https://prosperousai.com",
	description: "Prosperous AI is a messaging platform that uses artificial intelligence to help local businesses automate customer communication, manage inquiries, and respond across digital channels.",
	icon: "ProsperousAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "prosperous-ai:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.prosperousai\\.com"),
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
