import type { TechnologyDefinition } from '../../types';

export const amazonEcsTechnologyDefinition = {
	id: "amazon-ecs",
	name: "Amazon ECS",
	website: "https://aws.amazon.com/ecs/",
	description: "Amazon ECS is AWS's managed container orchestration service for running Docker containers.",
	icon: "Amazon ECS.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "amazon-ecs:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^ECS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-ecs:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ecs", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"amazon-web-services",
		"docker",
	],
} as const satisfies TechnologyDefinition;
