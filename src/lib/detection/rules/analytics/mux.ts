import type { TechnologyDefinition } from '../../types';

export const muxTechnologyDefinition = {
	id: "mux",
	name: "Mux",
	website: "https://www.mux.com",
	description: "Mux is a platform offering integration to monitor video streaming performance using minimal lines of code.",
	icon: "Mux.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "mux:jsGlobal:0",
			kind: "jsGlobal",
			property: "MuxVideoElement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mux:jsGlobal:1",
			kind: "jsGlobal",
			property: "initBitmovinMux",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
