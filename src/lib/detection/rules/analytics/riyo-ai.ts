import type { TechnologyDefinition } from '../../types';

export const riyoAiTechnologyDefinition = {
	id: "riyo-ai",
	name: "riyo.ai",
	website: "https://www.riyo.ai",
	description: "riyo.ai (formerly known as Traek) is a website insights, analytics and lead generation tool.",
	icon: "Riyo.AI.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "riyo-ai:jsGlobal:0",
			kind: "jsGlobal",
			property: "Traek",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
