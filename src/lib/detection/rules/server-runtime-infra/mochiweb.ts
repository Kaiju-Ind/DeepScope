import type { TechnologyDefinition } from '../../types';

export const mochiwebTechnologyDefinition = {
	id: "mochiweb",
	name: "MochiWeb",
	website: "https://github.com/mochi/mochiweb",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mochiweb:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("MochiWeb(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mochiweb:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mochiweb(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:mochiweb_project:mochiweb:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
