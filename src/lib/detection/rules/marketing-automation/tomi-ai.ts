import type { TechnologyDefinition } from '../../types';

export const tomiAiTechnologyDefinition = {
	id: "tomi-ai",
	name: "Tomi.ai",
	website: "https://tomi.ai",
	description: "Tomi.ai is a predictive marketing platform.",
	icon: "Tomi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tomi-ai:jsGlobal:0",
			kind: "jsGlobal",
			property: "tomi.track",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
