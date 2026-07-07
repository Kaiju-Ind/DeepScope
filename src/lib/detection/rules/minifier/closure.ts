import type { TechnologyDefinition } from '../../types';

export const closureTechnologyDefinition = {
	id: "closure",
	name: "Closure",
	website: "https://developers.google.com/closure/compiler",
	description: "JavaScript minifier and optimizer",
	categories: [
		"minifier",
	],
	rules: [
		{
			id: "closure:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.closure\\.min\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Closure Compiler.",
		},
		{
			id: "closure:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.cc\\.min\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Closure Compiler.",
		},
		{
			id: "closure:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("\\.[a-f0-9]{8}\\.closure\\.js$"),
			confidence: 90,
			description: "Resource filename or URL explicitly names Closure Compiler.",
		},
	],
} as const satisfies TechnologyDefinition;
