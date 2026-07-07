import type { TechnologyDefinition } from '../../types';

export const tanstackQueryTechnologyDefinition = {
	id: "tanstack-query",
	name: "TanStack Query",
	website: "https://tanstack.com/query",
	description: "Query-based state management.",
	categories: [
		"state-management",
	],
	rules: [
		{
			id: "tanstack-query:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("ensureInfiniteQueryData\\s*\\("),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("prefetchInfiniteQuery\\s*\\("),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("fetchInfiniteQuery\\s*\\("),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("observers\\.find\\([^)]+\\.shouldFetchOnReconnect\\(\\)\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\\w+\\.defaultMutationOptions\\s*\\("),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\\w+\\.options\\.refetchIntervalInBackground"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("_experimental_beforeQuery"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("_experimental_afterQuery"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:8",
			kind: "scriptContent",
			pattern: new RegExp("experimental_prefetchInRender"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-query:scriptContent:modern:9",
			kind: "scriptContent",
			pattern: new RegExp("[Nn]o\\s*QueryClient\\s*set,\\s*use\\s*QueryClientProvider"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
