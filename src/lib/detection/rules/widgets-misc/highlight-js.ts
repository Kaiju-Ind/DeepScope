import type { TechnologyDefinition } from '../../types';

export const highlightJsTechnologyDefinition = {
	id: "highlight-js",
	name: "Highlight.js",
	website: "https://highlightjs.org/",
	description: "Highlight.js is a JavaScript library for syntax highlighting, supporting 192 languages and 496 themes.",
	icon: "Highlight.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "highlight-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:([\\d.])+\\/)?highlight(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "highlight-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "hljs.highlightBlock",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "highlight-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "hljs.listLanguages",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
