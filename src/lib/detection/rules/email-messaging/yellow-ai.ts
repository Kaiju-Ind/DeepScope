import type { TechnologyDefinition } from '../../types';

export const yellowAiTechnologyDefinition = {
	id: "yellow-ai",
	name: "yellow.ai",
	website: "https://yellow.ai/",
	description: "yellow.ai provides chatbot and automation services.",
	icon: "yellow.ai.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "yellow-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.yellowmessenger\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yellow-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "ymConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
