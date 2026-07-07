import type { TechnologyDefinition } from '../../types';

export const forethoughtAiTechnologyDefinition = {
	id: "forethought-ai",
	name: "Forethought AI",
	website: "https://forethought.ai",
	description: "Forethought is a customer support AI platform designed to lower support costs and enhance customer experience.",
	icon: "ForethoughtAI.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "forethought-ai:dom:0",
			kind: "dom",
			selector: "iframe#forethought-chat",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "forethought-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "Forethought",
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
