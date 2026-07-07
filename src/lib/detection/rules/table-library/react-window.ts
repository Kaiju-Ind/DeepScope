import type { TechnologyDefinition } from '../../types';

export const reactWindowTechnologyDefinition = {
	id: "react-window",
	name: "React Window",
	website: "https://github.com/bvaughn/react-window",
	description: "React components for efficiently rendering large lists and tabular data",
	categories: [
		"table-library",
	],
	rules: [
		{
			id: "react-window:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("react-window[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-window:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"react-window\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-window:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"FixedSizeList\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-window:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"VariableSizeList\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-window:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"FixedSizeGrid\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-window:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"VariableSizeGrid\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
