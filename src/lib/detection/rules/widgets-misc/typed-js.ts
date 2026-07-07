import type { TechnologyDefinition } from '../../types';

export const typedJsTechnologyDefinition = {
	id: "typed-js",
	name: "Typed.js",
	website: "https://mattboldt.com/demos/typed-js/",
	description: "Typed.js is a library that types. It is designed to create typewriter-style animations with ease.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "typed-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("typed(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
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
