import type { TechnologyDefinition } from '../../types';

export const cantripTechnologyDefinition = {
	id: "cantrip",
	name: "Cantrip",
	website: "https://cantrip.io",
	description: "Cantrip is a tool that uses artificial intelligence to generate personalized websites.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cantrip:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Cantrip\\.io", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cantrip:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Cantrip Website Builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cantrip:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("cantrip\\.io", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cantrip:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^cantrip website builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
