import type { TechnologyDefinition } from '../../types';

export const iwebTechnologyDefinition = {
	id: "iweb",
	name: "iWeb",
	website: "https://www.apple.com/welcomescreen/ilife/iweb-3/",
	description: "iWeb is a web site creation tool.",
	icon: "iWeb.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "iweb:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^iWeb( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "iweb:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^iweb( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
