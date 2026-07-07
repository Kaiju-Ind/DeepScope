import type { TechnologyDefinition } from '../../types';

export const listJsTechnologyDefinition = {
	id: "list-js",
	name: "List.js",
	website: "https://listjs.com",
	description: "List.js is a small, fast JavaScript library that adds search, sort, and filter functionalities to plain HTML lists, tables, or other elements without requiring any dependencies.",
	icon: "List.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "list-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("list\\.js\\/"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "list-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("@([\\d.]+)\\/(?:\\/dist)?list\\.(?:min\\.)?js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "list-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "List",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
