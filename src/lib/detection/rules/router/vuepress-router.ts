import type { TechnologyDefinition } from '../../types';

export const vuepressRouterTechnologyDefinition = {
	id: "vuepress-router",
	name: "VuePress Router",
	website: "https://vuepress.vuejs.org/guide/page.html#routing",
	description: "VuePress has a file-system based router built on the concept of pages.",
	categories: [
		"router",
	],
	rules: [
		{
			id: "vuepress-router:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("@vuepress\\/(?:core|theme-default)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("__VUEPRESS_ROUTER_BASE__"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\\[vuepress\\] No matching page found for sidebar item"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\\[\\s*vuepress\\s*\\]\\s*page\\s*not\\s*found:"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\\.hasOwnProperty\\(\"internal_routes\"\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("RouterLink\\s*name=[\"'](?:vuepress)-"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("resolveMatchingRoute|resolvePageComponent"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("@vuepress\\/markdown|markdown-it"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress-router:scriptContent:modern:8",
			kind: "scriptContent",
			pattern: new RegExp("resolveThemeLayout|resolveLayoutComponent"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
