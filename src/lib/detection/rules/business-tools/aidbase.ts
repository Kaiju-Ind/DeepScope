import type { TechnologyDefinition } from '../../types';

export const aidbaseTechnologyDefinition = {
	id: "aidbase",
	name: "Aidbase",
	website: "https://www.aidbase.ai",
	description: "Aidbase is an AI-driven support ecosystem designed to enhance user experiences.",
	icon: "Aidbase.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "aidbase:jsGlobal:0",
			kind: "jsGlobal",
			property: "AIDBASE_CHATBOT_ID",
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
