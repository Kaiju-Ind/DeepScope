import type { TechnologyDefinition } from '../../types';

export const handsontableTechnologyDefinition = {
	id: "handsontable",
	name: "Handsontable",
	website: "https://handsontable.com",
	description: "Handsontable is a JavaScript component that combines data grid features with spreadsheet-like UX.",
	icon: "Handsontable.svg",
	categories: [
		"table-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "handsontable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?(?:jquery\\.)?handsontable(?:\\.full)?(?:\\.min)?(?:\\.[\\w]+)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "handsontable:jsGlobal:1",
			kind: "jsGlobal",
			property: "Handsontable",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "handsontable:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("handsontable"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "handsontable:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\bHandsontable\\b"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "handsontable:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("handsontable"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "handsontable:html:modern:3",
			kind: "html",
			pattern: new RegExp("class=\"ht_master\""),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "handsontable:html:modern:4",
			kind: "html",
			pattern: new RegExp("class=\"htCore\""),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "handsontable:html:modern:5",
			kind: "html",
			pattern: new RegExp("class=\"handsontable\""),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
