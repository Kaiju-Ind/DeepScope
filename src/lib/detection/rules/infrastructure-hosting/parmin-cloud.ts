import type { TechnologyDefinition } from '../../types';

export const parminCloudTechnologyDefinition = {
	id: "parmin-cloud",
	name: "Parmin Cloud",
	website: "https://parmin.cloud",
	description: "Parmin Cloud operates in the field of cloud services.",
	icon: "Parmin Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "parmin-cloud:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^ParminCloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "parmin-cloud:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^parmincloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
