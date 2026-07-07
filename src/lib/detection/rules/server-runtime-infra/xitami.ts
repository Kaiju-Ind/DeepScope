import type { TechnologyDefinition } from '../../types';

export const xitamiTechnologyDefinition = {
	id: "xitami",
	name: "Xitami",
	website: "https://xitami.com",
	icon: "Xitami.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "xitami:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Xitami(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "xitami:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("xitami(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:xitami:xitami:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
