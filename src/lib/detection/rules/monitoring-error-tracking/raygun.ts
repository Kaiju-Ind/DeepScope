import type { TechnologyDefinition } from '../../types';

export const raygunTechnologyDefinition = {
	id: "raygun",
	name: "Raygun",
	website: "https://raygun.com",
	description: "Raygun is a cloud-based networking monitoring and bug tracking application.",
	icon: "Raygun.svg",
	categories: [
		"monitoring-error-tracking",
		"developer-tooling",
	],
	rules: [
		{
			id: "raygun:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.raygun\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "raygun:jsGlobal:1",
			kind: "jsGlobal",
			property: "Raygun",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raygun:jsGlobal:2",
			kind: "jsGlobal",
			property: "raygunEnabled",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raygun:jsGlobal:3",
			kind: "jsGlobal",
			property: "raygunFactory",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raygun:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("this\\.DEFAULT_XHR_IGNORED_HOSTS\\s*=\\s*\\[\\s*['\"']raygun['\"']\\s*\\]"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "raygun:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("['\"]raygun4js-userid['\"]"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "raygun:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("Options\\._raygunApiUrl\\s*=\\s*['\"']https:\\/\\/api\\.raygun\\.io['\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "raygun:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("constructNewRaygun:"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "raygun:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.RaygunObject"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "raygun:resourceUrl:modern:5",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.raygun\\.io"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "raygun:resourceUrl:modern:6",
			kind: "resourceUrl",
			pattern: new RegExp("api\\.raygun\\.io"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
