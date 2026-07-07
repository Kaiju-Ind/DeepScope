import type { TechnologyDefinition } from '../../types';

export const theatreJsTechnologyDefinition = {
	id: "theatre-js",
	name: "Theatre.js",
	website: "https://www.theatrejs.com",
	description: "Theatre.js is a javascript animation library with a professional motion design toolset.",
	icon: "Theatre.js.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "theatre-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "__TheatreJS_CoreBundle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "theatre-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "__TheatreJS_CoreBundle.version",
			valuePattern: new RegExp("((?:\\d+\\.)+\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "theatre-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "__TheatreJS_CoreBundle.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
