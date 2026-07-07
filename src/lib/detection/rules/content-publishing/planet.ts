import type { TechnologyDefinition } from '../../types';

export const planetTechnologyDefinition = {
	id: "planet",
	name: "Planet",
	website: "https://planetplanet.org",
	description: "Planet is a feed aggregator, which creates pages with entries from the original feeds in chronological order, most recent entries first.",
	icon: "Planet.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "planet:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Planet(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "planet:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^planet(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:planet:planet:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
