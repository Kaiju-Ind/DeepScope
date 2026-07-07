import type { TechnologyDefinition } from '../../types';

export const dathuisTechnologyDefinition = {
	id: "dathuis",
	name: "DatHuis",
	website: "https://dathuis.nl",
	description: "DatHuis is a platform providing marketing automation tools for real estate professionals, designed to enhance visibility and streamline operations.",
	icon: "DatHuis.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "dathuis:jsGlobal:0",
			kind: "jsGlobal",
			property: "DatHuisObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
