import type { TechnologyDefinition } from '../../types';

export const roticTechnologyDefinition = {
	id: "rotic",
	name: "Rotic",
	website: "https://rotic.io",
	description: "Rotic is a conversion chatbot that answers questions, captures contacts, and books meetings.",
	icon: "Rotic.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "rotic:jsGlobal:0",
			kind: "jsGlobal",
			property: "Rotic.setting",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
