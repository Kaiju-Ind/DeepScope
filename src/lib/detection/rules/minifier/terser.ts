import type { TechnologyDefinition } from '../../types';

export const terserTechnologyDefinition = {
	id: "terser",
	name: "Terser",
	website: "https://terser.org/",
	description: "JavaScript parser, mangler, compressor, and beautifier toolkit",
	categories: [
		"minifier",
	],
	rules: [
		{
			id: "terser:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.terser\\.(?:min\\.)?js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Terser.",
		},
		{
			id: "terser:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.min\\.[a-f0-9]{8}\\.terser\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Terser.",
		},
	],
} as const satisfies TechnologyDefinition;
