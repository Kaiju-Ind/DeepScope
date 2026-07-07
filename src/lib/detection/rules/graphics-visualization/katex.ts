import type { TechnologyDefinition } from '../../types';

export const katexTechnologyDefinition = {
	id: "katex",
	name: "KaTeX",
	website: "https://katex.org/",
	description: "KaTeX is a cross-browser JavaScript library that displays mathematical notation in web browsers.",
	icon: "KaTeX.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "katex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("katex(@|\\/)[0-9.]+(?:\\/dist)?\\/katex(?:\\.min)?\\.(mjs|js|css)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "katex:dom:1",
			kind: "dom",
			selector: "link[href*=katex]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "katex:jsGlobal:2",
			kind: "jsGlobal",
			property: "katex",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "katex:jsGlobal:3",
			kind: "jsGlobal",
			property: "katex.version",
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
		cpe: "cpe:2.3:a:katex:katex:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
