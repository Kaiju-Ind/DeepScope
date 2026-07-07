import type { TechnologyDefinition } from '../../types';

export const akkaHttpTechnologyDefinition = {
	id: "akka-http",
	name: "Akka HTTP",
	website: "https://akka.io",
	description: "Akka HTTP is a toolkit for building HTTP clients and servers in Scala on the Akka actor system.",
	icon: "akka-http.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "akka-http:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("akka-http(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "akka-http:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("akka-http(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:lightbend:akka_http:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
