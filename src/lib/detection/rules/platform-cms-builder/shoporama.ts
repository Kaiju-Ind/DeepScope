import type { TechnologyDefinition } from '../../types';

export const shoporamaTechnologyDefinition = {
	id: "shoporama",
	name: "Shoporama",
	website: "https://www.shoporama.dk",
	icon: "Shoporama.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoporama:robots:0",
			kind: "robots",
			pattern: new RegExp("# Powered by Shoporama"),
			description: "robots.txt contains a known technology marker.",
		},
		{
			id: "shoporama:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Shoporama", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shoporama:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("shoporama", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
