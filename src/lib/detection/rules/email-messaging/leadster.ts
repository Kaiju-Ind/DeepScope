import type { TechnologyDefinition } from '../../types';

export const leadsterTechnologyDefinition = {
	id: "leadster",
	name: "Leadster",
	website: "https://leadster.com.br",
	description: "Leadster is a conversation marketing plataform based on chatbot.",
	icon: "Leadster.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "leadster:jsGlobal:0",
			kind: "jsGlobal",
			property: "neurolead.convoScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leadster:jsGlobal:1",
			kind: "jsGlobal",
			property: "neurolead.elChatbot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leadster:jsGlobal:2",
			kind: "jsGlobal",
			property: "neuroleadLanguage",
			description: "Page-owned global matches a known technology marker.",
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
