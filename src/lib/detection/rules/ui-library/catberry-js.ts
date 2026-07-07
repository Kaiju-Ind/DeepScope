import type { TechnologyDefinition } from '../../types';

export const catberryJsTechnologyDefinition = {
	id: "catberry-js",
	name: "Catberry.js",
	website: "https://catberry.github.io/",
	description: "Catberry.js is a framework for building isomorphic web applications that render on both the server and client sides using JavaScript.",
	icon: "Catberry.js.png",
	categories: [
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "catberry-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "catberry",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "catberry-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "catberry.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "catberry-js:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Catberry", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "catberry-js:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("catberry", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
