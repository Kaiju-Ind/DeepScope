import type { TechnologyDefinition } from '../../types';

export const lumeTechnologyDefinition = {
	id: "lume",
	name: "Lume",
	website: "https://lume.land",
	description: "Lume is a static site generator based on Deno.",
	icon: "Lume.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "lume:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Lume\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lume:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^lume\\sv([\\d\\.]+)$", "i"),
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
	implies: [
		"deno",
	],
} as const satisfies TechnologyDefinition;
