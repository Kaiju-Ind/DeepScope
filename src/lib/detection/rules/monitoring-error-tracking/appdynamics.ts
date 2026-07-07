import type { TechnologyDefinition } from '../../types';

export const appdynamicsTechnologyDefinition = {
	id: "appdynamics",
	name: "AppDynamics",
	website: "https://docs.appdynamics.com/",
	description: "Application performance monitoring and analytics.",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "appdynamics:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("log\\(\\s*['\"]AppDynamics EUM cloud application key missing\\. Please specify window\\[['\"]adrum-app-key['\"]\\]"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "appdynamics:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("EventType\\.ADRUM_XHR"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "appdynamics:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\\.adrumArgs\\b"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "appdynamics:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("userConf\\.adrumExtUrl(?:Http|Https)?"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "appdynamics:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.adrumExtUrl"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "appdynamics:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.userConf\\.disableAdrumHeader"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "appdynamics:resourceUrl:modern:6",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.appdynamics\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "appdynamics:resourceUrl:modern:7",
			kind: "resourceUrl",
			pattern: new RegExp("col\\.eum-appdynamics\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
