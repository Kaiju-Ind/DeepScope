import type { TechnologyDefinition } from '../../types';

export const hoganJsTechnologyDefinition = {
	id: "hogan-js",
	name: "Hogan.js",
	website: "https://twitter.github.io/hogan.js/",
	description: "Hogan.js is a JavaScript templating engine developed by Twitter, designed for both client-side and server-side applications, and it follows the Mustache template syntax for efficient and flexible template rendering.",
	icon: "Hogan.js.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "hogan-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hogan-[.-]([\\d.]*\\d)[^/]*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hogan-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d.]+)\\/hogan(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hogan-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Hogan",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
