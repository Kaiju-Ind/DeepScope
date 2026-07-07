import type { TechnologyDefinition } from '../../types';

export const learnbaseTechnologyDefinition = {
	id: "learnbase",
	name: "Learnbase",
	website: "https://uselearnbase.com",
	description: "Learnbase is an AI-powered platform for creators and students that provides tools to support teaching, learning, and content creation.",
	icon: "Learnbase.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "learnbase:jsGlobal:0",
			kind: "jsGlobal",
			property: "Learnbase",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "learnbase:jsGlobal:1",
			kind: "jsGlobal",
			property: "Learnbase.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "learnbase:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Learnbase$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "learnbase:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^learnbase$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
