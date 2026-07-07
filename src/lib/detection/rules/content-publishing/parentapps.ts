import type { TechnologyDefinition } from '../../types';

export const parentappsTechnologyDefinition = {
	id: "parentapps",
	name: "Parentapps",
	website: "https://www.parentapps.co.uk",
	description: "Parentapps is a school communication platform designed to streamline interaction between parents and teachers through centralized messaging and updates.",
	icon: "Parentapps.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "parentapps:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Parentapps(?: v\\.([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "parentapps:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("parentapps(?: v\\.([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
