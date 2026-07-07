import type { TechnologyDefinition } from '../../types';

export const mamboTechnologyDefinition = {
	id: "mambo",
	name: "Mambo",
	website: "https://mambo-foundation.org",
	icon: "Mambo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mambo:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Mambo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mambo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("mambo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	excludes: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
