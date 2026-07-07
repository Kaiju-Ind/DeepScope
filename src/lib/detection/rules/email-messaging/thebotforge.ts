import type { TechnologyDefinition } from '../../types';

export const thebotforgeTechnologyDefinition = {
	id: "thebotforge",
	name: "TheBotForge",
	website: "https://thebotforge.ai",
	description: "TheBotForge is an AI chatbot creation platform.",
	icon: "TheBotForge.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "thebotforge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.thebotforge\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
