import type { TechnologyDefinition } from '../../types';

export const ultimateTechnologyDefinition = {
	id: "ultimate",
	name: "Ultimate",
	website: "https://www.ultimate.ai",
	description: "Ultimate is a platform for automating customer service using conversational and generative AI technology.",
	icon: "Ultimate.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "ultimate:jsGlobal:0",
			kind: "jsGlobal",
			property: "ultimateAiLogin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ultimate:jsGlobal:1",
			kind: "jsGlobal",
			property: "ultimateAiUpdateUser",
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
