import type { TechnologyDefinition } from '../../types';

export const jottfulTechnologyDefinition = {
	id: "jottful",
	name: "Jottful",
	website: "https://jottful.com",
	description: "Jottful is a platform that enables small businesses to create and manage professional websites.",
	icon: "Jottful.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jottful:meta:0",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^Jottful", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jottful:meta:1",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^jottful", "i"),
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
