import type { TechnologyDefinition } from '../../types';

export const simplehttpTechnologyDefinition = {
	id: "simplehttp",
	name: "SimpleHTTP",
	website: "https://example.com",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "simplehttp:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("SimpleHTTP(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "simplehttp:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("simplehttp(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
