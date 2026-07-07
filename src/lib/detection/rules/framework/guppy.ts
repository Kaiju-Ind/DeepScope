import type { TechnologyDefinition } from '../../types';

export const guppyTechnologyDefinition = {
	id: "guppy",
	name: "GuppY",
	website: "https://www.freeguppy.org",
	description: "Guppy is a platform for generating an interactive website using a database-free architecture.",
	icon: "Guppy.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "guppy:meta:0",
			kind: "meta",
			key: "Author",
			valuePattern: new RegExp("^GuppY$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "guppy:meta:1",
			kind: "meta",
			key: "Generator",
			valuePattern: new RegExp("^GuppY$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "guppy:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^guppy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "guppy:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^guppy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:freeguppy:guppy:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
