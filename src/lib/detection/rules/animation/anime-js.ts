import type { TechnologyDefinition } from '../../types';

export const animeJsTechnologyDefinition = {
	id: "anime-js",
	name: "anime.js",
	website: "https://animejs.com/",
	description: "Anime.js (/ˈæn.ə.meɪ/) is a lightweight JavaScript animation library with a simple, yet powerful API.It works with CSS properties, SVG, DOM attributes and JavaScript Objects.",
	icon: "anime.js.svg",
	categories: [
		"animation",
		"graphics-visualization",
	],
	rules: [
		{
			id: "anime-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "anime.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "anime-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "AnimeJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "anime-js:header:2",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("animejs\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "anime-js:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("animejs[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "anime-js:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("anime\\.min\\.js"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "anime-js:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("anime\\.es\\.js"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "anime-js:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"animejs\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
