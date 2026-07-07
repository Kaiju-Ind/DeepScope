import type { TechnologyDefinition } from '../../types';

export const moveoAiTechnologyDefinition = {
	id: "moveo-ai",
	name: "Moveo.AI",
	website: "https://moveo.ai",
	description: "Moveo. AI is a no-code platform that allows businesses to create, manage and deploy AI virtual agents (chatbots).",
	icon: "Moveo.AI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "moveo-ai:jsGlobal:0",
			kind: "jsGlobal",
			property: "MoveoAI",
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
