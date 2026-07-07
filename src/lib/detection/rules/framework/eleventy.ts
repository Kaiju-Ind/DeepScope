import type { TechnologyDefinition } from '../../types';

export const eleventyTechnologyDefinition = {
	id: "eleventy",
	name: "Eleventy",
	website: "https://www.11ty.dev",
	description: "Eleventy (11ty) a simpler static site generator.",
	icon: "Eleventy.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "eleventy:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Eleventy\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "eleventy:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^eleventy\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
