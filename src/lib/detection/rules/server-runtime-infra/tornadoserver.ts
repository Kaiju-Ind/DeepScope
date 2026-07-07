import type { TechnologyDefinition } from '../../types';

export const tornadoserverTechnologyDefinition = {
	id: "tornadoserver",
	name: "TornadoServer",
	website: "https://tornadoweb.org",
	icon: "TornadoServer.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "tornadoserver:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("TornadoServer(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "tornadoserver:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("tornadoserver(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
