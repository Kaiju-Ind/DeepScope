import type { TechnologyDefinition } from '../../types';

export const threekitTechnologyDefinition = {
	id: "threekit",
	name: "Threekit",
	website: "https://www.threekit.com",
	description: "Threekit is a visual customer experience solution that enables brands to create, manage and scale photorealistic images and 3D product visuals, all from a single design file.",
	icon: "Threekit.svg",
	categories: [
		"graphics-visualization",
		"media-video",
	],
	rules: [
		{
			id: "threekit:jsGlobal:0",
			kind: "jsGlobal",
			property: "threekit.configuratorForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "threekit:jsGlobal:1",
			kind: "jsGlobal",
			property: "threekitAR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "threekit:jsGlobal:2",
			kind: "jsGlobal",
			property: "threekitPlayer",
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
