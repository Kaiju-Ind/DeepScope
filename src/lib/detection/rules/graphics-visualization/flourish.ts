import type { TechnologyDefinition } from '../../types';

export const flourishTechnologyDefinition = {
	id: "flourish",
	name: "Flourish",
	website: "https://flourish.studio",
	description: "Flourish is a data visualisation and storytelling platform that enables users to create interactive data visualisations, charts, and presentations.",
	icon: "Flourish.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "flourish:jsGlobal:0",
			kind: "jsGlobal",
			property: "Flourish.environment",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flourish:jsGlobal:1",
			kind: "jsGlobal",
			property: "FlourishConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flourish:jsGlobal:2",
			kind: "jsGlobal",
			property: "FlourishLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flourish:jsGlobal:3",
			kind: "jsGlobal",
			property: "_Flourish_template_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
