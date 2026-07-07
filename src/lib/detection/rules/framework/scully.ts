import type { TechnologyDefinition } from '../../types';

export const scullyTechnologyDefinition = {
	id: "scully",
	name: "Scully",
	website: "https://scully.io",
	description: "Scully is a static site generator for Angular projects looking to embrace the Jamstack.",
	icon: "Scully.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "scully:jsGlobal:0",
			kind: "jsGlobal",
			property: "ScullyIO",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "scully:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Scully\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "scully:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^scully\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:scully:scully:*:*:*:*:*:*:*:*",
	},
	implies: [
		"angular",
	],
} as const satisfies TechnologyDefinition;
