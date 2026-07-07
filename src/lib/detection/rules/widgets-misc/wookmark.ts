import type { TechnologyDefinition } from '../../types';

export const wookmarkTechnologyDefinition = {
	id: "wookmark",
	name: "WookMark",
	website: "https://wookmark.com",
	description: "WookMark is a plugin for laying out elements of varying heights in a column-based grid.",
	icon: "WookMark.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "wookmark:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wookmark\\.min\\.js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wookmark:jsGlobal:1",
			kind: "jsGlobal",
			property: "Wookmark",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
