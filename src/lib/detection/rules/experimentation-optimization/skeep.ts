import type { TechnologyDefinition } from '../../types';

export const skeepTechnologyDefinition = {
	id: "skeep",
	name: "Skeep",
	website: "https://www.skeep.io",
	description: "Skeep is a tool that uses automated Generative AI quizzes to guide visitors to suitable products, helping boost conversions without requiring any setup.",
	icon: "Skeep.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "skeep:jsGlobal:0",
			kind: "jsGlobal",
			property: "skeep",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
