import type { TechnologyDefinition } from '../../types';

export const zensicalTechnologyDefinition = {
	id: "zensical",
	name: "Zensical",
	website: "https://zensical.org",
	description: "Zensical is an open-source platform that enables scalable technical-writing systems designed to maintain uninterrupted workflow.",
	icon: "Zensical.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "zensical:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("zensical-([\\d\\.]+)", "i"),
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
