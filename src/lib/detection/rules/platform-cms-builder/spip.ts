import type { TechnologyDefinition } from '../../types';

export const spipTechnologyDefinition = {
	id: "spip",
	name: "SPIP",
	website: "https://www.spip.net",
	description: "SPIP is a content management system written in PHP that uses one or more databases like SQL, SQLite or PostgreSQL.",
	icon: "spip.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spip:dom:0",
			kind: "dom",
			selector: "div.formulaire_spip",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "spip:header:1",
			kind: "header",
			key: "Composed-By",
			valuePattern: new RegExp("SPIP ([\\d.]+) @", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "spip:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:^|\\s)SPIP(?:\\s([\\d.]+(?:\\s\\[\\d+\\])?))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "spip:header:3",
			kind: "header",
			key: "composed-by",
			valuePattern: new RegExp("spip ([\\d.]+) @", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "spip:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:^|\\s)spip(?:\\s([\\d.]+(?:\\s\\[\\d+\\])?))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:spip:spip:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
