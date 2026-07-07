import type { TechnologyDefinition } from '../../types';

export const easyengineTechnologyDefinition = {
	id: "easyengine",
	name: "EasyEngine",
	website: "https://easyengine.io",
	description: "EasyEngine is a command-line tool for the Nginx web servers to manage WordPress sites that are running on the LEMP Stack.",
	icon: "EasyEngine.png",
	categories: [
		"developer-tooling",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "easyengine:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^EasyEngine (.*)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "easyengine:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^easyengine (.*)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"docker",
	],
} as const satisfies TechnologyDefinition;
