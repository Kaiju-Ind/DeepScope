import type { TechnologyDefinition } from '../../types';

export const wikiJsTechnologyDefinition = {
	id: "wiki-js",
	name: "Wiki.js",
	website: "https://js.wiki",
	description: "Wiki.js is a wiki engine running on Node.js and written in JavaScript.",
	icon: "Wiki.js.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "wiki-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "WIKI.$_apolloInitData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wiki-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "WIKI.$apolloProvider",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:requarks:wiki.js:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
