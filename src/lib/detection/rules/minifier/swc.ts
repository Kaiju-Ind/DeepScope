import type { TechnologyDefinition } from '../../types';

export const swcTechnologyDefinition = {
	id: "swc",
	name: "SWC",
	website: "https://swc.rs",
	description: "SWC is a fast compiler and minifier for JavaScript and TypeScript.",
	categories: [
		"minifier",
		"transpiler",
	],
	rules: [
		{
			id: "swc:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.swc\\.min\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names SWC.",
		},
		{
			id: "swc:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.min\\.swc\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names SWC.",
		},
	],
} as const satisfies TechnologyDefinition;
