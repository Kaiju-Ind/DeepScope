import type { TechnologyDefinition } from '../../types';

export const reactTableLegacyTechnologyDefinition = {
	id: "react-table-legacy",
	name: "React Table (Legacy)",
	website: "https://github.com/TanStack/table/tree/v7",
	description: "Hooks for building lightweight, fast and extendable datagrids for React",
	categories: [
		"table-library",
	],
	rules: [
		{
			id: "react-table-legacy:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("react-table[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-table-legacy:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"react-table\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-table-legacy:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"useTable\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-table-legacy:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"useSortBy\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-table-legacy:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"useFilters\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-table-legacy:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"usePagination\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-table-legacy:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\"useGroupBy\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
