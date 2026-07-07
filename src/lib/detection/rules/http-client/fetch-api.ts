import type { TechnologyDefinition } from '../../types';

export const fetchApiTechnologyDefinition = {
	id: "fetch-api",
	name: "Fetch API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
	description: "Modern interface for fetching resources across the network.",
	categories: [
		"http-client",
	],
	rules: [
		{
			id: "fetch-api:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("(?:^|[^.a-zA-Z])fetch\\s*\\([^,)]+,\\s*\\{[^}]*(?:method|body|mode|credentials|keepalive|headers):", "i"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "fetch-api:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("(?:^|[^.a-zA-Z])fetch\\s*\\([^)]+\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "fetch-api:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("new\\s+AbortController\\(\\)[^}]*fetch\\s*\\([^)]+signal:"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "fetch-api:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\\.clone\\(\\)\\.(?:json|text|blob)\\(\\)"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "fetch-api:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\\.body\\.getReader\\(\\)"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "fetch-api:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("Response\\.redirect\\([^)]+\\)"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
