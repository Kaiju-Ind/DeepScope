import type { TechnologyDefinition } from '../../types';

export const amayaTechnologyDefinition = {
	id: "amaya",
	name: "Amaya",
	website: "https://www.w3.org/Amaya",
	description: "Amaya is an open-source web browser editor to create and update documents on the web.",
	icon: "Amaya.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "amaya:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Amaya(?: V?([\\d.]+[a-z]))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "amaya:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("amaya(?: v?([\\d.]+[a-z]))?", "i"),
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
