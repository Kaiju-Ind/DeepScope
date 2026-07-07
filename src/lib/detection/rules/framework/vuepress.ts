import type { TechnologyDefinition } from '../../types';

export const vuepressTechnologyDefinition = {
	id: "vuepress",
	name: "VuePress",
	website: "https://vuepress.vuejs.org/",
	description: "VuePress is a static site generator with a Vue-powered theming system, and a default theme for writing technical documentation.",
	icon: "VuePress.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "vuepress:jsGlobal:0",
			kind: "jsGlobal",
			property: "__VUEPRESS__.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vuepress:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^VuePress(?: ([0-9.]+)(-[a-z]+.[0-9]+)?)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vuepress:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^vuepress(?: ([0-9.]+)(-[a-z]+.[0-9]+)?)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vuepress:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\[\\s*vuepress\\s*\\]\\s*Cannot\\s+resolve\\s+layout"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\$vuepress"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("__VUEPRESS_VERSION__"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("__VUEPRESS_DEV__"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("(?:VPSidebarItem|VPNavLink)\\s*,\\s*\\{\\s*(?:key|item|text|link)\\s*:"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("__VUEPRESS_PREFETCH__"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("__VUEPRESS_PRELOAD__"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("\"VUEPRESS_TAB_STORE\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:8",
			kind: "scriptContent",
			pattern: new RegExp("\"VUEPRESS_CODE_TAB_STORE\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vuepress:scriptContent:modern:9",
			kind: "scriptContent",
			pattern: new RegExp("__VUEPRESS_SSR__"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
