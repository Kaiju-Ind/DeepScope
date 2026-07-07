import type { TechnologyDefinition } from '../../types';

export const dojoTechnologyDefinition = {
	id: "dojo",
	name: "Dojo",
	website: "https://dojotoolkit.org",
	description: "Dojo is an open-source JavaScript toolkit for building web applications.",
	icon: "Dojo.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "dojo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d.]+)\\/dojo\\/dojo(?:\\.xd)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dojo:jsGlobal:1",
			kind: "jsGlobal",
			property: "dojo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dojo:jsGlobal:2",
			kind: "jsGlobal",
			property: "dojo.version.major",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dojo:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("((?:\\d+\\.)+\\d+)\\/dojo\\/dojo(?:\\.xd)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:dojotoolkit:dojo:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
