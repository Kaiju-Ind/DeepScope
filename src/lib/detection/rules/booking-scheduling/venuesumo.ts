import type { TechnologyDefinition } from '../../types';

export const venuesumoTechnologyDefinition = {
	id: "venuesumo",
	name: "VenueSumo",
	website: "https://venuesumo.com",
	description: "VenueSumo is a cloud-based venue management platform that centralizes sales, booking, and operational workflows to support revenue tracking and optimize administrative efficiency.",
	icon: "VenueSumo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "venuesumo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.venuesumo\\.app"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "venuesumo:jsGlobal:1",
			kind: "jsGlobal",
			property: "venueSumo",
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
