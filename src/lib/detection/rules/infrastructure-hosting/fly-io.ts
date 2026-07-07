import type { TechnologyDefinition } from '../../types';

export const flyIoTechnologyDefinition = {
	id: "fly-io",
	name: "Fly.io",
	website: "https://fly.io",
	description: "Fly is a platform for running full stack apps and databases.",
	icon: "Fly.io.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "fly-io:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_fly$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "fly-io:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Fly\\/[\\w]+\\s\\(.*\\)$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fly-io:header:2",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("^.*\\sfly\\.io$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fly-io:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^fly\\/[\\w]+\\s\\(.*\\)$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
