import type { TechnologyDefinition } from '../../types';

export const fireworkTechnologyDefinition = {
	id: "firework",
	name: "Firework",
	website: "https://firework.com",
	description: "Firework is a video commerce solution for brands, retailers, and publishers, enhancing digital storefronts with interactive livestream and shoppable video features.",
	icon: "Firework.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "firework:jsGlobal:0",
			kind: "jsGlobal",
			property: "_fwn",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "firework:jsGlobal:1",
			kind: "jsGlobal",
			property: "_fwnPerformance",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "firework:jsGlobal:2",
			kind: "jsGlobal",
			property: "fwnPolyfillPromise",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
