import type { TechnologyDefinition } from '../../types';

export const luaTechnologyDefinition = {
	id: "lua",
	name: "Lua",
	website: "https://www.lua.org",
	description: "Lua is a multi-paradigm programming language designed primarily for embedded use in applications.",
	icon: "Lua.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "lua:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("\\bLua(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "lua:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("\\blua(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:lua:lua:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
