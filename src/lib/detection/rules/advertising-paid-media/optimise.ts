import type { TechnologyDefinition } from '../../types';

export const optimiseTechnologyDefinition = {
	id: "optimise",
	name: "Optimise",
	website: "https://www.optimisemedia.com",
	description: "Optimize Media Group is an UK-based performance advertising network.",
	icon: "Optimise.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "optimise:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("track\\.omguk\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optimise:jsGlobal:1",
			kind: "jsGlobal",
			property: "OMID",
			valuePattern: new RegExp("^[0-9]+$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
