import type { TechnologyDefinition } from '../../types';

export const websocketTechnologyDefinition = {
	id: "websocket",
	name: "WebSocket",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket",
	description: "Full-duplex communication channels over a single TCP connection",
	categories: [
		"api-pattern",
	],
	rules: [
		{
			id: "websocket:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\"socket\\.io\""),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "websocket:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"sockjs\""),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "websocket:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("socket\\.io[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "websocket:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("sockjs[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "websocket:resourceUrl:modern:4",
			kind: "resourceUrl",
			pattern: new RegExp("ws[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "websocket:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("[\"']wss?:\\/\\/"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
