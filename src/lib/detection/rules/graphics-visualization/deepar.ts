import type { TechnologyDefinition } from '../../types';

export const deeparTechnologyDefinition = {
	id: "deepar",
	name: "DeepAR",
	website: "https://www.deepar.ai",
	description: "DeepAR is SDK that integrates AR face filters, 3D masks, effects, and background removal into websites, apps, or games.",
	icon: "DeepAR.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "deepar:dom:0",
			kind: "dom",
			selector: "source[src*='demo.deepar.ai/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
