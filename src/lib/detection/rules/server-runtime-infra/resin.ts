import type { TechnologyDefinition } from '../../types';

export const resinTechnologyDefinition = {
	id: "resin",
	name: "Resin",
	website: "https://caucho.com",
	icon: "Resin.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "resin:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Resin(?:\\/(\\S*))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "resin:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^resin(?:\\/(\\s*))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:caucho:resin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
