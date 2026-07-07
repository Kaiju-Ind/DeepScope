import type { TechnologyDefinition } from '../../types';

export const pathsJsTechnologyDefinition = {
	id: "paths-js",
	name: "Paths.js",
	website: "https://github.com/andreaferretti/paths-js",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "paths-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("paths(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
