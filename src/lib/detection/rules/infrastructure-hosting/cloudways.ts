import type { TechnologyDefinition } from '../../types';

export const cloudwaysTechnologyDefinition = {
	id: "cloudways",
	name: "Cloudways",
	website: "https://www.cloudways.com",
	description: "Cloudways offers managed cloud-hosting services for WordPress sites on a cloud server where multiple copies of your content will be replicated throughout your chosen data center.",
	icon: "Cloudways.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "cloudways:header:0",
			kind: "header",
			key: "cache-provider",
			valuePattern: new RegExp("CLOUDWAYS-CACHE-DE", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cloudways:header:1",
			kind: "header",
			key: "cache-provider",
			valuePattern: new RegExp("cloudways-cache-de", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
