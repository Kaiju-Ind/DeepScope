import type { TechnologyDefinition } from '../../types';

export const mediahawkTechnologyDefinition = {
	id: "mediahawk",
	name: "Mediahawk",
	website: "http://mediahawk.co.uk",
	description: "Mediahawk is a call analytics software for marketers.",
	icon: "Mediahawk.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "mediahawk:jsGlobal:0",
			kind: "jsGlobal",
			property: "_mhct",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediahawk:jsGlobal:1",
			kind: "jsGlobal",
			property: "mhctRequestFiredBeforeComplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediahawk:jsGlobal:2",
			kind: "jsGlobal",
			property: "mhctRequestInitial",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediahawk:jsGlobal:3",
			kind: "jsGlobal",
			property: "mhctRequestRunning",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
