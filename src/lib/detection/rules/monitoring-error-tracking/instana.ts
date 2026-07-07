import type { TechnologyDefinition } from '../../types';

export const instanaTechnologyDefinition = {
	id: "instana",
	name: "Instana",
	website: "https://www.instana.com/",
	description: "Harness the power of AI and automation to proactively solve issues across the application stack.",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "instana:html:modern:0",
			kind: "html",
			pattern: new RegExp("<meta\\s+name=[\"']instana[\"']\\s+content=[\"'][^\"']+[\"']\\s*\\/?>"),
			confidence: 75,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "instana:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("(?:import|require)\\s*\\(\\s*['\"]@instana\\/[^'\"]*['\"]\\s*\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "instana:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\\{\\s*(?:ineum|instana|eum)(?:Key|Token|ApiKey):\\s*['\"][a-zA-Z0-9_-]+['\"]"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "instana:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("instana\\.io"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
