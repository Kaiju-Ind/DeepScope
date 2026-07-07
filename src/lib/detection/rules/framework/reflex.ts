import type { TechnologyDefinition } from '../../types';

export const reflexTechnologyDefinition = {
	id: "reflex",
	name: "Reflex",
	website: "https://reflex.dev",
	description: "Reflex is an open-source framework to build and deploy web apps.",
	icon: "Reflex.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "reflex:jsGlobal:0",
			kind: "jsGlobal",
			property: "__reflex.react",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reflex:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Reflex$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "reflex:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^reflex$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
	requires: [
		"react",
	],
} as const satisfies TechnologyDefinition;
