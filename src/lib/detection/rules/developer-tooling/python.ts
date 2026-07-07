import type { TechnologyDefinition } from '../../types';

export const pythonTechnologyDefinition = {
	id: "python",
	name: "Python",
	website: "https://python.org",
	description: "Python is a general-purpose programming language used for web development, automation, data, and scientific computing.",
	icon: "Python.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "python:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("(?:^|\\s)Python(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "python:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("(?:^|\\s)python(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:python:python:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
