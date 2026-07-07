import type { TechnologyDefinition } from '../../types';

export const glideJsTechnologyDefinition = {
	id: "glide-js",
	name: "Glide.js",
	website: "https://glidejs.com",
	description: "Glide.js is a dependency-free JavaScript ES6 slider and carousel.",
	icon: "Glide.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "glide-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/@glidejs\\/glide(?:@([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "glide-js:dom:1",
			kind: "dom",
			selector: "div[data-glide-el]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "glide-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Glide",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
