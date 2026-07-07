import type { TechnologyDefinition } from '../../types';

export const blotoutEdgetagTechnologyDefinition = {
	id: "blotout-edgetag",
	name: "Blotout EdgeTag",
	website: "https://blotout.io",
	description: "Blotout EdgeTag is a technology provided by Blotout that tackles the effects of privacy changes on C-API signals by reconstructing signals around a lifetime ID, allowing for real-time remarketing of site visits.",
	icon: "Blotout.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "blotout-edgetag:jsGlobal:0",
			kind: "jsGlobal",
			property: "edgetag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blotout-edgetag:jsGlobal:1",
			kind: "jsGlobal",
			property: "edgetagProviders",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
