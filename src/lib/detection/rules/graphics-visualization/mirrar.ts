import type { TechnologyDefinition } from '../../types';

export const mirrarTechnologyDefinition = {
	id: "mirrar",
	name: "mirrAR",
	website: "https://www.mirrar.com",
	description: "mirrAR is a real-time augmented reality platform for retail brands that enables consumers to virtually try on products and experience how it feels to own them before the actual purchase, both in-store and online.",
	icon: "mirrAR.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "mirrar:jsGlobal:0",
			kind: "jsGlobal",
			property: "initMirrarUI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mirrar:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadmirrAR",
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
