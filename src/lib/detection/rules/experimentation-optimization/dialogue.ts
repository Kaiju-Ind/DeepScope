import type { TechnologyDefinition } from '../../types';

export const dialogueTechnologyDefinition = {
	id: "dialogue",
	name: "Dialogue",
	website: "https://nowdialogue.com/",
	description: "Dialogue is an ecommerce personalization platform that helps brands increase sales and conversion rates through AI-driven recommendations.",
	icon: "Dialogue.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "dialogue:jsGlobal:0",
			kind: "jsGlobal",
			property: "DialogueAI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
