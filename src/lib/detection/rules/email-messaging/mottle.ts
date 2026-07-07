import type { TechnologyDefinition } from '../../types';

export const mottleTechnologyDefinition = {
	id: "mottle",
	name: "Mottle",
	website: "https://mottle.com",
	description: "Mottle is a custom chatbot creation tool that allows users to build expressive ChatGPT-like chatbots using their own data.",
	icon: "Mottle.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "mottle:dom:0",
			kind: "dom",
			selector: "link[href*='embed.mottle.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mottle:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mottle",
			description: "Page-owned global matches a known technology marker.",
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
