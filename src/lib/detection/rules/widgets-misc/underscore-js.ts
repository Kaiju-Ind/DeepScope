import type { TechnologyDefinition } from '../../types';

export const underscoreJsTechnologyDefinition = {
	id: "underscore-js",
	name: "Underscore.js",
	website: "https://underscorejs.org",
	description: "Underscore.js is a JavaScript library which provides utility functions for common programming tasks. It is comparable to features provided by Prototype.js and the Ruby language, but opts for a functional programming design instead of extending object prototypes.",
	icon: "Underscore.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "underscore-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("underscore.*\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "underscore-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "_.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			confidence: 0,
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "underscore-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "_.restArguments",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	excludes: [
		"lodash",
	],
} as const satisfies TechnologyDefinition;
