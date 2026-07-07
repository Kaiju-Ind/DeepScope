import type { TechnologyDefinition } from '../../types';

export const oatTechnologyDefinition = {
	id: "oat",
	name: "Oat++",
	website: "https://oatpp.io",
	description: "Oat++ is an open source C++ Web Framework.",
	icon: "Oat.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "oat:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^oatpp\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "oat:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^oatpp\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:oatpp:oat\\+\\+:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
