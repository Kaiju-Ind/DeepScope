import type { TechnologyDefinition } from '../../types';

export const simplexnoiseJsTechnologyDefinition = {
	id: "simplexnoise-js",
	name: "SimplexNoise.js",
	website: "https://github.com/jwagner/simplex-noise.js",
	description: "SimplexNoise.js is a library that generates pseudorandom noise functions, designed for use in video games, graphical applications, and demoscene production.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "simplexnoise-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/simplex-noise\\/([\\d\\.]+)\\/simplex-noise.min.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simplexnoise-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "SimplexNoise",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
