import type { TechnologyDefinition } from '../../types';

export const bluefishTechnologyDefinition = {
	id: "bluefish",
	name: "Bluefish",
	website: "https://sourceforge.net/projects/bluefish",
	description: "Bluefish is a free software text editor with a variety of tools for programming in general and the development of websites.",
	icon: "Bluefish.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "bluefish:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Bluefish(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bluefish:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("bluefish(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
