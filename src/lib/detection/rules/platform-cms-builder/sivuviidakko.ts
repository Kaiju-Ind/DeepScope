import type { TechnologyDefinition } from '../../types';

export const sivuviidakkoTechnologyDefinition = {
	id: "sivuviidakko",
	name: "Sivuviidakko",
	website: "https://sivuviidakko.fi",
	icon: "Sivuviidakko.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sivuviidakko:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Sivuviidakko", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sivuviidakko:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("sivuviidakko", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
