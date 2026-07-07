import type { TechnologyDefinition } from '../../types';

export const lodashTechnologyDefinition = {
	id: "lodash",
	name: "Lodash",
	website: "https://www.lodash.com",
	description: "Lodash is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm.",
	icon: "Lodash.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lodash:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lodash.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lodash:jsGlobal:1",
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
			id: "lodash:jsGlobal:2",
			kind: "jsGlobal",
			property: "_.differenceBy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lodash:jsGlobal:3",
			kind: "jsGlobal",
			property: "_.templateSettings.imports._.templateSettings.imports._.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:lodash:lodash:*:*:*:*:*:*:*:*",
	},
	excludes: [
		"underscore-js",
	],
} as const satisfies TechnologyDefinition;
