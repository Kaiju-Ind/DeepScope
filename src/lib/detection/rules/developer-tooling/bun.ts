import type { TechnologyDefinition } from '../../types';

export const bunTechnologyDefinition = {
	id: "bun",
	name: "bun",
	website: "https://bun.sh",
	description: "Bun is a fast JavaScript runtime compatible with Node.js and Deno.",
	icon: "bun.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "bun:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Bun", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bun:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("bun", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
