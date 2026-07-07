import type { TechnologyDefinition } from '../../types';

export const movableInkTechnologyDefinition = {
	id: "movable-ink",
	name: "Movable Ink",
	website: "https://movableink.com",
	description: "Movable Ink is a technology company that allows marketers to change emails after they have been sent out.",
	icon: "Movable Ink.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "movable-ink:jsGlobal:0",
			kind: "jsGlobal",
			property: "MovableInkTrack",
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
