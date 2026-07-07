import type { TechnologyDefinition } from '../../types';

export const monkeyHttpServerTechnologyDefinition = {
	id: "monkey-http-server",
	name: "Monkey HTTP Server",
	website: "https://monkey-project.com",
	icon: "Monkey HTTP Server.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "monkey-http-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Monkey\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "monkey-http-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("monkey\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
