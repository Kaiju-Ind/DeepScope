import type { TechnologyDefinition } from '../../types';

export const sazitoTechnologyDefinition = {
	id: "sazito",
	name: "Sazito",
	website: "https://sazito.com",
	icon: "Sazito.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sazito:jsGlobal:0",
			kind: "jsGlobal",
			property: "Sazito",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sazito:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Sazito", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sazito:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sazito", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
