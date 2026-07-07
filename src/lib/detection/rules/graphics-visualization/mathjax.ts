import type { TechnologyDefinition } from '../../types';

export const mathjaxTechnologyDefinition = {
	id: "mathjax",
	name: "MathJax",
	website: "https://www.mathjax.org",
	description: "MathJax is a cross-browser JavaScript library that displays mathematical notation in web browsers, using MathML, LaTeX and ASCIIMathML markup.",
	icon: "MathJax.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "mathjax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d.]+)?\\/mathjax\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mathjax:jsGlobal:1",
			kind: "jsGlobal",
			property: "MathJax",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mathjax:jsGlobal:2",
			kind: "jsGlobal",
			property: "MathJax.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:mathjax:mathjax:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
