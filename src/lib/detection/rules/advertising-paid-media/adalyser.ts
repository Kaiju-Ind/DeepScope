import type { TechnologyDefinition } from '../../types';

export const adalyserTechnologyDefinition = {
	id: "adalyser",
	name: "Adalyser",
	website: "https://adalyser.com/",
	description: "Adalyser is an online platform offering the tools needed to get up and running with TV advertising.",
	icon: "Adalyser.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adalyser:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("c5\\.adalyser\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adalyser:jsGlobal:1",
			kind: "jsGlobal",
			property: "adalyserModules",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
