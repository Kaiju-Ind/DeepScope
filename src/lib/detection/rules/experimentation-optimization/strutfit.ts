import type { TechnologyDefinition } from '../../types';

export const strutfitTechnologyDefinition = {
	id: "strutfit",
	name: "StrutFit",
	website: "https://www.strut.fit",
	description: "StrutFit is an online sizing platform for footwear retailers.",
	icon: "StrutFit.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "strutfit:dom:0",
			kind: "dom",
			selector: "iframe[src*='.strut.fit/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "strutfit:jsGlobal:1",
			kind: "jsGlobal",
			property: "rerenderStrutfit",
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
