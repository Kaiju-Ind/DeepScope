import type { TechnologyDefinition } from '../../types';

export const fingTechnologyDefinition = {
	id: "fing",
	name: "Fing",
	website: "https://fing.ir",
	description: "Fing is a cloud service to deploy and manage your applications without being worried about your infrastructure and environment.",
	icon: "Fing.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "fing:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Fing", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fing:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^fing", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
