import type { TechnologyDefinition } from '../../types';

export const mutinyTechnologyDefinition = {
	id: "mutiny",
	name: "Mutiny",
	website: "https://www.mutinyhq.com",
	description: "Mutiny is a no-code AI platform designed to aid marketers in converting top-of-funnel demand into revenue without requiring the expertise of engineers.",
	icon: "Mutiny.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "mutiny:jsGlobal:0",
			kind: "jsGlobal",
			property: "mutiny",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mutiny:jsGlobal:1",
			kind: "jsGlobal",
			property: "mutinyData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mutiny:jsGlobal:2",
			kind: "jsGlobal",
			property: "mutinyEditor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mutiny:jsGlobal:3",
			kind: "jsGlobal",
			property: "mutinyWpJsonp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:mutiny:mutiny:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
