import type { TechnologyDefinition } from '../../types';

export const animeJsTechnologyDefinition = {
	id: "anime-js",
	name: "anime.js",
	website: "https://animejs.com/",
	description: "Anime.js (/ˈæn.ə.meɪ/) is a lightweight JavaScript animation library with a simple, yet powerful API. It works with CSS properties, SVG, DOM attributes and JavaScript Objects.",
	icon: "anime.js.svg",
	categories: [
		"api-pattern",
		"animation",
		"graphics-visualization",
	],
	rules: [
		{
			id: "anime-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "AnimeJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "anime-js:jsGlobal:1",
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
			id: "anime-js:responseHeader:2",
			kind: "responseHeader",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("animejs\\.com"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
