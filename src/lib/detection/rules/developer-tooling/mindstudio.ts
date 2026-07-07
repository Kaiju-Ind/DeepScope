import type { TechnologyDefinition } from '../../types';

export const mindstudioTechnologyDefinition = {
	id: "mindstudio",
	name: "MindStudio",
	website: "https://www.mindstudio.ai",
	description: "MindStudio is a platform for creating AI solutions that are simple and hassle-free.",
	icon: "MindStudio.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "mindstudio:jsGlobal:0",
			kind: "jsGlobal",
			property: "MindStudioSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
