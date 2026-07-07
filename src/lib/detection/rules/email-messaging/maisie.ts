import type { TechnologyDefinition } from '../../types';

export const maisieTechnologyDefinition = {
	id: "maisie",
	name: "Maisie",
	website: "https://www.maisieai.com",
	description: "Maisie is an AI-powered conversational assistant that provides automated sales and customer support by handling queries around the clock.",
	icon: "Maisie.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "maisie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.mymaisie\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maisie:jsGlobal:1",
			kind: "jsGlobal",
			property: "maisieChatBotContext",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maisie:jsGlobal:2",
			kind: "jsGlobal",
			property: "maisieWebpackJsonpFunction",
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
