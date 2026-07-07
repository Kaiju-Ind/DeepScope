import type { TechnologyDefinition } from '../../types';

export const frontityTechnologyDefinition = {
	id: "frontity",
	name: "Frontity",
	website: "https://frontity.org",
	description: "Frontity is a React open-source framework focused on WordPress.",
	icon: "frontity.png",
	categories: [
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "frontity:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Frontity", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "frontity:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^frontity", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"react",
		"webpack",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
