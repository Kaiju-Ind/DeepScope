import type { TechnologyDefinition } from '../../types';

export const liineTechnologyDefinition = {
	id: "liine",
	name: "Liine",
	website: "https://www.liine.com",
	description: "Liine is an all-in-one platform for monitoring, optimizing, and incentivizing the management of new patient calls.",
	icon: "Liine.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "liine:jsGlobal:0",
			kind: "jsGlobal",
			property: "Liine.addURLChangeListener",
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
