import type { TechnologyDefinition } from '../../types';

export const blueconicTechnologyDefinition = {
	id: "blueconic",
	name: "BlueConic",
	website: "https://www.blueconic.com",
	description: "BlueConic is the advanced customer data platform that liberates companies' first-party data from disparate systems.",
	icon: "BlueConic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "blueconic:jsGlobal:0",
			kind: "jsGlobal",
			property: "BlueConicEngagement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blueconic:jsGlobal:1",
			kind: "jsGlobal",
			property: "blueConicClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blueconic:jsGlobal:2",
			kind: "jsGlobal",
			property: "blueConicPreListeners",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blueconic:jsGlobal:3",
			kind: "jsGlobal",
			property: "loadValuesFromBlueConic",
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
