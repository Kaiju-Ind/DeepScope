import type { TechnologyDefinition } from '../../types';

export const hyperscriptTechnologyDefinition = {
	id: "hyperscript",
	name: "_hyperscript",
	website: "https://hyperscript.org",
	description: "_​hyperscript is a scripting language for adding interactivity to the front-end.",
	icon: "_hyperscript.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "hyperscript:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/unpkg\\.com\\/hyperscript\\.org@([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hyperscript:jsGlobal:1",
			kind: "jsGlobal",
			property: "_hyperscript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
