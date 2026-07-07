import type { TechnologyDefinition } from '../../types';

export const dorsaCloudTechnologyDefinition = {
	id: "dorsa-cloud",
	name: "Dorsa Cloud",
	website: "https://dorsa.cloud",
	description: "Dorsa Cloud is a cloud service provider offering scalable and flexible Infrastructure as a Service (IaaS) solutions for businesses.",
	icon: "Dorsa Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "dorsa-cloud:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Dorsa Cloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dorsa-cloud:header:1",
			kind: "header",
			key: "x-cdn-provider",
			valuePattern: new RegExp("^Dorsa Cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dorsa-cloud:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Dorsa Cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dorsa-cloud:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^dorsa cloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dorsa-cloud:header:4",
			kind: "header",
			key: "x-cdn-provider",
			valuePattern: new RegExp("^dorsa cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "dorsa-cloud:header:5",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^dorsa cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
