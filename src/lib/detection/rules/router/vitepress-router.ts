import type { TechnologyDefinition } from '../../types';

export const vitepressRouterTechnologyDefinition = {
	id: "vitepress-router",
	name: "VitePress Router",
	website: "https://vitepress.dev/guide/routing",
	description: "VitePress has a file-system based router built on the concept of pages.",
	categories: [
		"router",
	],
	rules: [
		{
			id: "vitepress-router:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.md\\.js\"\\},\"(\\w+)\":{\"importName"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vitepress-router:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.replace\\(\\/(?:\\(\\^|\\\\\\/)index(?:\\.html\\)\\$|\\\\\\/)\\/,\\s*[\"']\\$1[\"']\\)"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
