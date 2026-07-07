import type { TechnologyDefinition } from '../../types';

export const fraseTechnologyDefinition = {
	id: "frase",
	name: "Frase",
	website: "https://www.frase.io",
	description: "Frase is a content system powered by AI, designed to streamline content creation processes.",
	icon: "Frase.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "frase:jsGlobal:0",
			kind: "jsGlobal",
			property: "frase",
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
