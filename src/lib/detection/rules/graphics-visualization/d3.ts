import type { TechnologyDefinition } from '../../types';

export const d3TechnologyDefinition = {
	id: "d3",
	name: "D3",
	website: "https://d3js.org",
	description: "D3.js is a JavaScript library for producing dynamic, interactive data visualisations in web browsers.",
	icon: "D3.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "d3:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/d3(?:\\. v\\d+)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "d3:jsGlobal:1",
			kind: "jsGlobal",
			property: "d3.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "d3:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/d3(?:\\.v\\d+)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:d3.js_project:d3.js:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
