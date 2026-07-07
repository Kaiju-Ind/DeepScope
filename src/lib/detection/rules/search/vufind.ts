import type { TechnologyDefinition } from '../../types';

export const vufindTechnologyDefinition = {
	id: "vufind",
	name: "VuFind",
	website: "https://vufind.org",
	description: "VuFind is a library resource portal designed and developed by Villanova University library.",
	icon: "VuFind.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "vufind:jsGlobal:0",
			kind: "jsGlobal",
			property: "VuFind.defaultSearchBackend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vufind:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^VuFind\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vufind:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^vufind\\s([\\d\\.]+)$", "i"),
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
