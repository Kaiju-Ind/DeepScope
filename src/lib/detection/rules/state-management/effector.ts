import type { TechnologyDefinition } from '../../types';

export const effectorTechnologyDefinition = {
	id: "effector",
	name: "Effector",
	website: "https://effector.dev/",
	description: "The state manager that helps to create fast and reliable applications.",
	categories: [
		"state-management",
	],
	rules: [
		{
			id: "effector:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\"Handlers map can contain only effects as keys\""),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"Values map can contain only writable stores as keys\""),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("['\"](family|graphite)[\"']\\s+in\\s+e"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\\.graphite\\s*\\|\\|\\s*e"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\\.family\\.owner"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\\{store:\\s*t\\.stateRef,\\s*to:\\s*['\"]stack[\"']\\}"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\\{store:\\s*[^,]+,\\s*to:\\s*['\"](?:stack|a|b)[\"']"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("priority:\\s*['\"](?:barrier|read)[\"']"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "effector:scriptContent:modern:8",
			kind: "scriptContent",
			pattern: new RegExp("\\.sidMap\\[O\\([^,]+,\\s*['\"]sid[\"']\\)\\]"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
