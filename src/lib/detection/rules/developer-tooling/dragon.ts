import type { TechnologyDefinition } from '../../types';

export const dragonTechnologyDefinition = {
	id: "dragon",
	name: "Dragon",
	website: "https://dragon-lang.org",
	description: "Dragon is a general-purpose programming language.",
	icon: "Dragon.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "dragon:url:0",
			kind: "url",
			pattern: new RegExp("^.*(?:\\.dgn)$"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "dragon:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Dragon Native ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dragon:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("dragon native ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"apache-http-server",
	],
} as const satisfies TechnologyDefinition;
