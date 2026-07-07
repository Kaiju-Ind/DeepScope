import type { TechnologyDefinition } from '../../types';

export const corebineTechnologyDefinition = {
	id: "corebine",
	name: "Corebine",
	website: "https://corebine.com",
	description: "Corebine is a content management system designed for Sports",
	icon: "Corebine.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "corebine:dom:0",
			kind: "dom",
			selector: "#corebine-app",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "corebine:jsGlobal:1",
			kind: "jsGlobal",
			property: "corebine",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
