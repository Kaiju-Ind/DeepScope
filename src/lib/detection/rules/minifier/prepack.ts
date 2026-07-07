import type { TechnologyDefinition } from '../../types';

export const prepackTechnologyDefinition = {
	id: "prepack",
	name: "Prepack",
	website: "https://prepack.io/",
	description: "Partial evaluator for JavaScript",
	categories: [
		"minifier",
	],
	rules: [
		{
			id: "prepack:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.prepack\\.min\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Prepack.",
		},
		{
			id: "prepack:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.pp\\.min\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Prepack.",
		},
		{
			id: "prepack:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("\\.[a-f0-9]{8}\\.prepack\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Prepack.",
		},
	],
} as const satisfies TechnologyDefinition;
