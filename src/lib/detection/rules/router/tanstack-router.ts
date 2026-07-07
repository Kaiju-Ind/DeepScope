import type { TechnologyDefinition } from '../../types';

export const tanstackRouterTechnologyDefinition = {
	id: "tanstack-router",
	name: "TanStack Router",
	website: "https://tanstack.com/router",
	description: "Tanstack has a file-system based router built on the concept of pages.",
	categories: [
		"router",
	],
	rules: [
		{
			id: "tanstack-router:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("[\"']@t(?:anstack)?[/\\\\-]router(?:-(?:core|devtools))?[\"']"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-router:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("__TANSTACK_ROUTER_(?:STATE|HISTORY|DEVTOOLS)__"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-router:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\\$TSR_ROUTER\\$"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-router:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\\$TS_ROUTER\\$"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-router:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("routeMasks.*find.*No.*basepath.*pathname.*caseSensitive:"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-router:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("notFoundRoute.*tanstack\\.com\\/router\\/v1\\/docs\\/framework\\/react\\/guide\\/not-found-errors"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-router:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("createFileRoute\\s*\\(\\s*['\"][/\\w]+['\"]\\s*,?\\s*\\{"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-router:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("createLazyFileRoute\\s*\\(\\s*['\"][/\\w]+['\"]\\s*,?\\s*\\{"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
