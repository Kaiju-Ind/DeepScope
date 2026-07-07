import type { TechnologyDefinition } from '../../types';

export const honeybadgerTechnologyDefinition = {
	id: "honeybadger",
	name: "Honeybadger",
	website: "https://www.honeybadger.io/",
	description: "Ship better software faster with full-stack application monitoring that works like you think it should.",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "honeybadger:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("userFeedbackEndpoint:\\s*['\"']https:\\/\\/api\\.honeybadger\\.io\\/v2\\/feedback['\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("unshift\\(\\s*['\"]\\[Honeybadger\\]['\"]\\s*\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("this\\.logger\\.debug\\(['\"']skipping error report: honeybadger\\.js is disabled"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("this\\.logger\\.log\\(['\"']honeybadger\\.js is in development mode; the following error report will be sent in production\\."),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("this\\.addBreadcrumb\\(['\"']Honeybadger Notice"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.honeybadgerUserFeedbackOptions"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.___hb\\.___hb"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("urlPrefix:\\s*['\"']https:\\/\\/app\\.honeybadger\\.io['\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "honeybadger:resourceUrl:modern:8",
			kind: "resourceUrl",
			pattern: new RegExp("eu\\-api\\.honeybadger\\.io"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "honeybadger:resourceUrl:modern:9",
			kind: "resourceUrl",
			pattern: new RegExp("api\\.honeybadger\\.io"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
