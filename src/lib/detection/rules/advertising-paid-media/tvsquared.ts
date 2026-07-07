import type { TechnologyDefinition } from '../../types';

export const tvsquaredTechnologyDefinition = {
	id: "tvsquared",
	name: "TVSquared",
	website: "https://www.tvsquared.com",
	description: "TVSquared is a cross-platform TV ad measurement, analytics and optimisation platform.",
	icon: "TVSquared.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tvsquared:dom:0",
			kind: "dom",
			selector: "link[href*='.tvsquared.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tvsquared:jsGlobal:1",
			kind: "jsGlobal",
			property: "TV2Track",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tvsquared:jsGlobal:2",
			kind: "jsGlobal",
			property: "_tvq",
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
