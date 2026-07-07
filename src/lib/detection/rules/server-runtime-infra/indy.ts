import type { TechnologyDefinition } from '../../types';

export const indyTechnologyDefinition = {
	id: "indy",
	name: "Indy",
	website: "https://indyproject.org",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "indy:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Indy(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "indy:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("indy(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
