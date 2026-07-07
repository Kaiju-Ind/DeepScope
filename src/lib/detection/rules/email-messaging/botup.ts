import type { TechnologyDefinition } from '../../types';

export const botupTechnologyDefinition = {
	id: "botup",
	name: "BotUp",
	website: "https://botup.com",
	description: "BotUp is a chatbot software that helps build your chatbot without coding.",
	icon: "BotUp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botup:jsGlobal:0",
			kind: "jsGlobal",
			property: "_Botup",
			description: "Page-owned global matches a known technology marker.",
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
