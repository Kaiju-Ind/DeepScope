import type { TechnologyDefinition } from '../../types';

export const kapaAiTechnologyDefinition = {
	id: "kapa-ai",
	name: "Kapa.ai",
	website: "https://www.kapa.ai",
	description: "Kapa.ai is a platform that converts documents into an LLM-powered chatbot for information retrieval and question answering.",
	icon: "Kapa.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "kapa-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.kapa\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kapa-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kapa",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kapa-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "KapaWidget.init",
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
