import type { TechnologyDefinition } from '../../types';

export const esyndicatTechnologyDefinition = {
	id: "esyndicat",
	name: "eSyndiCat",
	website: "https://esyndicat.com",
	icon: "eSyndiCat.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "esyndicat:jsGlobal:0",
			kind: "jsGlobal",
			property: "esyndicat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "esyndicat:header:1",
			kind: "header",
			key: "X-Drectory-Script",
			valuePattern: new RegExp("^eSyndiCat", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "esyndicat:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^eSyndiCat ", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "esyndicat:header:3",
			kind: "header",
			key: "x-drectory-script",
			valuePattern: new RegExp("^esyndicat", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "esyndicat:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^esyndicat ", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
