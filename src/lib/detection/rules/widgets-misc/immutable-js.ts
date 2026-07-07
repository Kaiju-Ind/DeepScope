import type { TechnologyDefinition } from '../../types';

export const immutableJsTechnologyDefinition = {
	id: "immutable-js",
	name: "Immutable.js",
	website: "https://facebook.github.io/immutable-js/",
	description: "Immutable.js is a JavaScript library developed by Facebook that provides immutable data structures for more predictable state management in applications.",
	icon: "Immutable.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "immutable-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^immutable\\.(?:min\\.)?js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "immutable-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Immutable",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "immutable-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Immutable.version",
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
	},
} as const satisfies TechnologyDefinition;
