import type { TechnologyDefinition } from '../../types';

export const cherokeeTechnologyDefinition = {
	id: "cherokee",
	name: "Cherokee",
	website: "https://www.cherokee-project.com",
	icon: "Cherokee.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "cherokee:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Cherokee(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cherokee:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^cherokee(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cherokee-project:cherokee:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
