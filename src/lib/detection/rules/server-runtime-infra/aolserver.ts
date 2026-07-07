import type { TechnologyDefinition } from '../../types';

export const aolserverTechnologyDefinition = {
	id: "aolserver",
	name: "AOLserver",
	website: "https://aolserver.com",
	description: "AOLserver is an open-source web server and application server for dynamic websites.",
	icon: "AOLserver.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "aolserver:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("AOLserver\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "aolserver:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("aolserver\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:aol:aolserver:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
