import type { TechnologyDefinition } from '../../types';

export const etermioTechnologyDefinition = {
	id: "etermio",
	name: "Etermio",
	website: "https://www.etermio.com",
	description: "Etermio is an automated system for online appointment scheduling.",
	icon: "Etermio.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "etermio:jsGlobal:0",
			kind: "jsGlobal",
			property: "$eTermio",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "etermio:jsGlobal:1",
			kind: "jsGlobal",
			property: "eTermio_autoOpenWindow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "etermio:jsGlobal:2",
			kind: "jsGlobal",
			property: "etermio_handler",
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
