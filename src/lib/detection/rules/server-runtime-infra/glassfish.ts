import type { TechnologyDefinition } from '../../types';

export const glassfishTechnologyDefinition = {
	id: "glassfish",
	name: "GlassFish",
	website: "https://glassfish.java.net",
	icon: "GlassFish.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "glassfish:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("GlassFish(?: Server)?(?: Open Source Edition)?(?: ?\\/?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "glassfish:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("glassfish(?: server)?(?: open source edition)?(?: ?\\/?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:oracle:glassfish_server:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
