import type { TechnologyDefinition } from '../../types';

export const papaParseTechnologyDefinition = {
	id: "papa-parse",
	name: "Papa Parse",
	website: "https://www.papaparse.com",
	description: "Papa Parse is a JavaScript library that functions as an in-browser CSV parser, enabling parsing of CSV files within web applications.",
	icon: "PapaParse.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "papa-parse:jsGlobal:0",
			kind: "jsGlobal",
			property: "Papa.Parser",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "papa-parse:jsGlobal:1",
			kind: "jsGlobal",
			property: "Papa.parse",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:papaparse:papaparse:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
