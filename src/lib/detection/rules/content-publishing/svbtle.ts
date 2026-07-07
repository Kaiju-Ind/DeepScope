import type { TechnologyDefinition } from '../../types';

export const svbtleTechnologyDefinition = {
	id: "svbtle",
	name: "Svbtle",
	website: "https://www.svbtle.com",
	description: "Svbtle is a minimalist blogging platform that focuses on simplicity and a clean writing experience.",
	icon: "svbtle.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "svbtle:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.svbtle\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "svbtle:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Svbtle\\.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "svbtle:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^svbtle\\.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
