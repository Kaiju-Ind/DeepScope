import type { TechnologyDefinition } from '../../types';

export const gridsomeTechnologyDefinition = {
	id: "gridsome",
	name: "Gridsome",
	website: "https://gridsome.org",
	description: "Gridsome is a free and open-source Vue-powered static site generator for building static websites.",
	icon: "Gridsome.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "gridsome:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Gridsome v([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gridsome:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^gridsome v([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
