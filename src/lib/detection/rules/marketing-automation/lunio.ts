import type { TechnologyDefinition } from '../../types';

export const lunioTechnologyDefinition = {
	id: "lunio",
	name: "Lunio",
	website: "https://lunio.ai",
	description: "Lunio is a tool that enhances marketing efficiency by removing invalid traffic from paid marketing channels, enabling advertisers to reach a larger audience within the same budget.",
	icon: "Lunio.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "lunio:jsGlobal:0",
			kind: "jsGlobal",
			property: "LunioClientData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lunio:jsGlobal:1",
			kind: "jsGlobal",
			property: "LunioTrackConversion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lunio:jsGlobal:2",
			kind: "jsGlobal",
			property: "lunioScript",
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
