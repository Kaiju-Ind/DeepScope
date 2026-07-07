import type { TechnologyDefinition } from '../../types';

export const nuxtTechnologyDefinition = {
	id: "nuxt",
	name: "Nuxt",
	website: "https://nuxtjs.org/",
	description: "Nuxt.js is a free and open-source web application framework based on Vue.js, Node.js, Webpack and Babel.js.",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "nuxt:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("$nuxt"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nuxt:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\$nuxt\\."),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nuxt:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("_nuxt\\/"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nuxt:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("__NUXT_STATE__"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nuxt:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("__NUXT_LOADED__"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nuxt:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("__NUXT_ERROR__"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nuxt:resourceUrl:modern:6",
			kind: "resourceUrl",
			pattern: new RegExp("\\.nuxt\\/"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "nuxt:resourceUrl:modern:7",
			kind: "resourceUrl",
			pattern: new RegExp("_nuxt\\/"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "nuxt:resourceUrl:modern:8",
			kind: "resourceUrl",
			pattern: new RegExp("\\/_nuxt\\/"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
