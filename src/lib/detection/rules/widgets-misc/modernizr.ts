import type { TechnologyDefinition } from '../../types';

export const modernizrTechnologyDefinition = {
	id: "modernizr",
	name: "Modernizr",
	website: "https://modernizr.com",
	description: "Modernizr is a JavaScript library that detects the features available in a user's browser.",
	icon: "Modernizr.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "modernizr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d.]+)?\\/modernizr(?:\\.([\\d.]+))?.*\\.js"),
			version: {
				source: "match",
				template: "$1?$1:$2",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "modernizr:jsGlobal:1",
			kind: "jsGlobal",
			property: "Modernizr._version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "modernizr:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("modernizr(?:\\.([\\d.]+))?.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "modernizr:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d.]+)?\\/modernizr.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
