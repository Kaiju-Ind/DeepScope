import type { TechnologyDefinition } from '../../types';

export const formsortTechnologyDefinition = {
	id: "formsort",
	name: "Formsort",
	website: "https://formsort.com",
	description: "Formsort is a system that enables form design and data conversion within applications.",
	icon: "Formsort.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formsort:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunk_formsort_flow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "formsort:meta:1",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("^formsort$", "i"),
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
