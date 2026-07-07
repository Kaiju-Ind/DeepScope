import type { TechnologyDefinition } from '../../types';

export const chabokanTechnologyDefinition = {
	id: "chabokan",
	name: "Chabokan",
	website: "https://chabokan.net",
	description: "Chabokan is a cloud services provider, offering a wide range of incorporated cloud services including Cloud Object Storage, DBaaS, BaaS, and PaaS.",
	icon: "Chabokan.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "chabokan:header:0",
			kind: "header",
			key: "ch-powered-by",
			valuePattern: new RegExp("Chabokan\\s\\(chabokan\\.net\\)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "chabokan:header:1",
			kind: "header",
			key: "ch-powered-by",
			valuePattern: new RegExp("chabokan\\s\\(chabokan\\.net\\)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
