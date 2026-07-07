import type { TechnologyDefinition } from '../../types';

export const gliderJsTechnologyDefinition = {
	id: "glider-js",
	name: "Glider.js",
	website: "https://nickpiscitelli.github.io/Glider.js",
	description: "Glider.js is a fast, lightweight, responsive, dependency-free scrollable list with customisable paging controls.",
	icon: "Glider.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "glider-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/|@)?([\\d\\.]{2,})?\\/glider\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
