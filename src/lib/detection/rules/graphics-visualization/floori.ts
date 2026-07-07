import type { TechnologyDefinition } from '../../types';

export const flooriTechnologyDefinition = {
	id: "floori",
	name: "Floori",
	website: "https://floori.io",
	description: "Floori is an online tool designed to help users visualize different types of flooring in their home.",
	icon: "Floori.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "floori:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkfloori",
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
