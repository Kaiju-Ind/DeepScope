import type { TechnologyDefinition } from '../../types';

export const reactVirtuosoTechnologyDefinition = {
	id: "react-virtuoso",
	name: "React Virtuoso",
	website: "https://virtuoso.dev/",
	description: "The most powerful virtual list component for React",
	categories: [
		"table-library",
	],
	rules: [
		{
			id: "react-virtuoso:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("react-virtuoso[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-virtuoso:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"react-virtuoso\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-virtuoso:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"Virtuoso\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-virtuoso:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"GroupedVirtuoso\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-virtuoso:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"TableVirtuoso\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-virtuoso:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"VirtuosoGrid\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
