import type { TechnologyDefinition } from '../../types';

export const spotziTechnologyDefinition = {
	id: "spotzi",
	name: "Spotzi",
	website: "https://www.spotzi.com",
	description: "Spotzi is a provider of geomarketing solutions, focusing on data analytics and marketing.",
	icon: "Spotzi.svg",
	categories: [
		"analytics",
		"maps-location",
	],
	rules: [
		{
			id: "spotzi:jsGlobal:0",
			kind: "jsGlobal",
			property: "Spotzi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spotzi:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Spotzi$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "spotzi:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^spotzi$", "i"),
			description: "Meta tag matches a known technology marker.",
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
