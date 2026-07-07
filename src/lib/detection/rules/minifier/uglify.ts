import type { TechnologyDefinition } from '../../types';

export const uglifyTechnologyDefinition = {
	id: "uglify",
	name: "Uglify",
	website: "https://lisperator.net/uglifyjs/",
	description: "JavaScript parser, mangler, compressor, and beautifier toolkit",
	categories: [
		"minifier",
	],
	rules: [
		{
			id: "uglify:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.uglify(?:js)?\\.(?:min\\.)?js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Uglify.",
		},
		{
			id: "uglify:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.min\\.[a-f0-9]{8}\\.ugly\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Uglify.",
		},
	],
} as const satisfies TechnologyDefinition;
