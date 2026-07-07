import type { TechnologyDefinition } from '../../types';

export const miniflatTechnologyDefinition = {
	id: "miniflat",
	name: "Miniflat",
	website: "https://miniflat.ir",
	description: "Miniflat is an Iranian and Persian content management system developed with flat file technology.",
	icon: "Miniflat.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "miniflat:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Miniflat$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "miniflat:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^miniflat$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
