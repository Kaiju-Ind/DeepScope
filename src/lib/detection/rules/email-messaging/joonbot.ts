import type { TechnologyDefinition } from '../../types';

export const joonbotTechnologyDefinition = {
	id: "joonbot",
	name: "Joonbot",
	website: "https://joonbot.com",
	description: "Joonbot is a chatbot builder that enables users to create automated conversational flows without programming knowledge.",
	icon: "Joonbot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "joonbot:jsGlobal:0",
			kind: "jsGlobal",
			property: "JOONBOT_WIDGET_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "joonbot:jsGlobal:1",
			kind: "jsGlobal",
			property: "joonbot.hide",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
