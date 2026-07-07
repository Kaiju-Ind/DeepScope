import type { TechnologyDefinition } from '../../types';

export const tlootoTechnologyDefinition = {
	id: "tlooto",
	name: "tlooto",
	website: "https://tlooto.com",
	description: "tlooto is an AI assistant designed to support academic writing, research tasks, and information synthesis for educational and scholarly use.",
	icon: "tlooto.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "tlooto:jsGlobal:0",
			kind: "jsGlobal",
			property: "tlooto.copilot",
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
