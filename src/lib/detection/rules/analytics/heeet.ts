import type { TechnologyDefinition } from '../../types';

export const heeetTechnologyDefinition = {
	id: "heeet",
	name: "Heeet",
	website: "https://www.heeet.io",
	description: "Heeet is a lead tracking and marketing analytics tool.",
	icon: "Heeet.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "heeet:jsGlobal:0",
			kind: "jsGlobal",
			property: "heeet",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heeet:jsGlobal:1",
			kind: "jsGlobal",
			property: "heeetJourneyParams",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heeet:jsGlobal:2",
			kind: "jsGlobal",
			property: "heeetParams",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heeet:jsGlobal:3",
			kind: "jsGlobal",
			property: "heeetSaveJourney",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
