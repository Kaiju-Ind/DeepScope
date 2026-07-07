import type { TechnologyDefinition } from '../../types';

export const vectaryTechnologyDefinition = {
	id: "vectary",
	name: "Vectary",
	website: "https://www.vectary.com",
	description: "Vectary is fully-featured 3D modeling tool with photorealistic real-time rendering, augmented reality, interactions and animations.",
	icon: "vectary.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "vectary:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.vectary.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
