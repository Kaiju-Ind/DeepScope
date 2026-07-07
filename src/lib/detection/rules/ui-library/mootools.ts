import type { TechnologyDefinition } from '../../types';

export const mootoolsTechnologyDefinition = {
	id: "mootools",
	name: "MooTools",
	website: "https://mootools.net",
	description: "MooTools is a JavaScript framework that enhances web application development with utilities for DOM manipulation, animations, and AJAX interactions.",
	icon: "MooTools.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "mootools:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mootools.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mootools:jsGlobal:1",
			kind: "jsGlobal",
			property: "MooTools",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mootools:jsGlobal:2",
			kind: "jsGlobal",
			property: "MooTools.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:mootools:mootools:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
