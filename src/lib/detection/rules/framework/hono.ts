import type { TechnologyDefinition } from '../../types';

export const honoTechnologyDefinition = {
	id: "hono",
	name: "Hono",
	website: "https://hono.dev",
	description: "Hono is a small, simple, and ultrafast web framework for the Edge.",
	icon: "Hono.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "hono:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Hono", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hono:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("hono", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
