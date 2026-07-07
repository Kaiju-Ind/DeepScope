import type { TechnologyDefinition } from '../../types';

export const cactivecloudTechnologyDefinition = {
	id: "cactivecloud",
	name: "CactiveCloud",
	website: "https://cactivecloud.com",
	description: "CactiveCloud is a freemium based cloud provider and web server for static deployments of websites with HTML builds and serverless functions.",
	icon: "CactiveCloud.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "cactivecloud:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Cactive$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cactivecloud:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^cactive$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
