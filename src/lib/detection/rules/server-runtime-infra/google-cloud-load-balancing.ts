import type { TechnologyDefinition } from '../../types';

export const googleCloudLoadBalancingTechnologyDefinition = {
	id: "google-cloud-load-balancing",
	name: "Google Cloud Load Balancing",
	website: "https://cloud.google.com/load-balancing",
	description: "Google Cloud Load Balancing is a scalable, fully managed global load balancing service using Google Frontend.",
	icon: "Google Cloud.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "google-cloud-load-balancing:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Google Frontend$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "google-cloud-load-balancing:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^google frontend$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"poa",
		],
	},
	implies: [
		"google-cloud",
	],
} as const satisfies TechnologyDefinition;
