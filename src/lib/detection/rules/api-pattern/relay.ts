import type { TechnologyDefinition } from '../../types';

export const relayTechnologyDefinition = {
	id: "relay",
	name: "Relay",
	website: "https://relay.dev/",
	description: "A JavaScript framework for building data-driven React applications with GraphQL",
	categories: [
		"api-pattern",
	],
	rules: [
		{
			id: "relay:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("relay-runtime[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "relay:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("react-relay[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "relay:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"relay-runtime\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "relay:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"react-relay\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "relay:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"RelayEnvironmentProvider\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "relay:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"RelayModernEnvironment\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "relay:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\"RelayNetwork\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
