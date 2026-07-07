import type { TechnologyDefinition } from '../../types';

export const gotTechnologyDefinition = {
	id: "got",
	name: "got",
	website: "https://github.com/sindresorhus/got",
	description: "Simplified HTTP requests",
	categories: [
		"http-client",
	],
	rules: [
		{
			id: "got:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.paginate\\.all\\(\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "got:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.paginate\\.each\\(\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "got:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("'beforeRequest'\\s*,\\s*function"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "got:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("'beforeRedirect'\\s*,\\s*function"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "got:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("'beforeRetry'\\s*,\\s*function"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "got:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("'beforeError'\\s*,\\s*function"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "got:header:modern:6",
			kind: "header",
			key: "x-got-retry-count",
			valuePattern: new RegExp("^\\d+$"),
			confidence: 55,
			description: "HTTP response header matches a modern tooling marker.",
		},
		{
			id: "got:resourceUrl:modern:7",
			kind: "resourceUrl",
			pattern: new RegExp("got(?:\\.min)?\\.js$", "i"),
			confidence: 45,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "got:resourceUrl:modern:8",
			kind: "resourceUrl",
			pattern: new RegExp("got\\.[a-f0-9]{8,}\\.js$", "i"),
			confidence: 45,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
