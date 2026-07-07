import type { TechnologyDefinition } from '../../types';

export const reactVirtualizedTechnologyDefinition = {
	id: "react-virtualized",
	name: "React Virtualized",
	website: "https://github.com/bvaughn/react-virtualized",
	description: "React components for efficiently rendering large lists and tabular data",
	categories: [
		"table-library",
	],
	rules: [
		{
			id: "react-virtualized:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("react-virtualized"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-virtualized:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("react-virtualized"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-virtualized:html:modern:2",
			kind: "html",
			pattern: new RegExp("class=\"ReactVirtualized__"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "react-virtualized:html:modern:3",
			kind: "html",
			pattern: new RegExp("ReactVirtualized__Grid"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "react-virtualized:html:modern:4",
			kind: "html",
			pattern: new RegExp("ReactVirtualized__List"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "react-virtualized:html:modern:5",
			kind: "html",
			pattern: new RegExp("ReactVirtualized__Table"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
