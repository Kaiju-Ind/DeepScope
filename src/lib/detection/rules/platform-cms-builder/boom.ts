import type { TechnologyDefinition } from '../../types';

export const boomTechnologyDefinition = {
	id: "boom",
	name: "BOOM",
	website: "https://manaandisheh.com",
	icon: "boom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "boom:header:0",
			kind: "header",
			key: "X-Supplied-By",
			valuePattern: new RegExp("MANA", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "boom:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^boom site builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "boom:header:2",
			kind: "header",
			key: "x-supplied-by",
			valuePattern: new RegExp("mana", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
