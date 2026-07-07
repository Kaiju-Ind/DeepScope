import type { TechnologyDefinition } from '../../types';

export const babelMinifyTechnologyDefinition = {
	id: "babel-minify",
	name: "Babel Minify",
	website: "https://babeljs.io/docs/en/babel-minify",
	description: "Minify JavaScript using Babel",
	categories: [
		"minifier",
	],
	rules: [
		{
			id: "babel-minify:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("(?:babel-minify|babel-preset-minify)", "i"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Babel Minify.",
		},
	],
} as const satisfies TechnologyDefinition;
