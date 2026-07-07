import type { TechnologyDefinition } from '../../types';

export const apiaryTechnologyDefinition = {
	id: "apiary",
	name: "Apiary",
	website: "https://apiary.io",
	description: "Apiary is an API design stack that provides tools for designing, testing, and documenting APIs, built specifically to support developers throughout the API development process.",
	icon: "Apiary.svg",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "apiary:jsGlobal:0",
			kind: "jsGlobal",
			property: "Apiary",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apiary:jsGlobal:1",
			kind: "jsGlobal",
			property: "apiaryUserModel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apiary:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Apiary$"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
