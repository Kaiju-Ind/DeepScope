import type { TechnologyDefinition } from '../../types';

export const formlessTechnologyDefinition = {
	id: "formless",
	name: "Formless",
	website: "https://formless.ai",
	description: "Formless is an AI-powered solution that creates interactive forms, enabling natural conversation, asking and answering questions, and engaging users at any touchpoint.",
	icon: "Formless.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formless:jsGlobal:0",
			kind: "jsGlobal",
			property: "__formless_cleanup_signals",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "formless:jsGlobal:1",
			kind: "jsGlobal",
			property: "__formless_init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
