import type { TechnologyDefinition } from '../../types';

export const helipodTechnologyDefinition = {
	id: "helipod",
	name: "Helipod",
	website: "https://helipod.io",
	description: "Helipod is a platform as a service (PaaS) for deploying and running web applications.",
	icon: "Helipod.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "helipod:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Helipod$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "helipod:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Helipod$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
