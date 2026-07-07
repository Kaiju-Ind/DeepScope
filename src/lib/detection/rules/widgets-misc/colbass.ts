import type { TechnologyDefinition } from '../../types';

export const colbassTechnologyDefinition = {
	id: "colbass",
	name: "Colbass",
	website: "https://colbass.com",
	description: "Colbass is AI System that transforms text into real-human voiceovers.",
	icon: "colbass.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "colbass:jsGlobal:0",
			kind: "jsGlobal",
			property: "colbassRunning",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
