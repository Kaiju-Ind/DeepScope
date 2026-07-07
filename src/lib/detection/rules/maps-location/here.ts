import type { TechnologyDefinition } from '../../types';

export const hereTechnologyDefinition = {
	id: "here",
	name: "Here",
	website: "https://www.here.com",
	description: "HERE is a PaaS for creating custom maps, visualize location datasets, gather insights and buy and sell location assets.",
	icon: "here.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "here:dom:0",
			kind: "dom",
			selector: "link[href*='//js\\.api\\.here\\.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "here:jsGlobal:1",
			kind: "jsGlobal",
			property: "H.buildInfo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "here:jsGlobal:2",
			kind: "jsGlobal",
			property: "H.geo",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "here:jsGlobal:3",
			kind: "jsGlobal",
			property: "H.util",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
