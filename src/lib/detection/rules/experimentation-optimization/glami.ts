import type { TechnologyDefinition } from '../../types';

export const glamiTechnologyDefinition = {
	id: "glami",
	name: "Glami",
	website: "https://www.glami.sk",
	description: "Glami is a fashion quiz system designed to personalize style recommendations based on user preferences and responses.",
	icon: "Glami.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "glami:jsGlobal:0",
			kind: "jsGlobal",
			property: "GlamiTrackerObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "glami:jsGlobal:1",
			kind: "jsGlobal",
			property: "GlamiTrackerObjectInstance",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "glami:jsGlobal:2",
			kind: "jsGlobal",
			property: "glami",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
