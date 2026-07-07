import type { TechnologyDefinition } from '../../types';

export const mextyTechnologyDefinition = {
	id: "mexty",
	name: "Mexty",
	website: "https://mexty.ai",
	description: "Mexty is a no-code, AI-powered authoring platform that enables educators to create interactive lessons, activities, and courses quickly.",
	icon: "Mexty.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "mexty:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Mexty Team$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mexty:meta:1",
			kind: "meta",
			key: "creator",
			valuePattern: new RegExp("^Mexty$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mexty:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^mexty team$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mexty:meta:3",
			kind: "meta",
			key: "creator",
			valuePattern: new RegExp("^mexty$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
