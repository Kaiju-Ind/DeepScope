import type { TechnologyDefinition } from '../../types';

export const sarkaSpipTechnologyDefinition = {
	id: "sarka-spip",
	name: "Sarka-SPIP",
	website: "https://sarka-spip.net",
	icon: "Sarka-SPIP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sarka-spip:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Sarka-SPIP(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sarka-spip:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("sarka-spip(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"spip",
	],
} as const satisfies TechnologyDefinition;
