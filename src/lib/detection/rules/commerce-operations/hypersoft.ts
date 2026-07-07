import type { TechnologyDefinition } from '../../types';

export const hypersoftTechnologyDefinition = {
	id: "hypersoft",
	name: "Hypersoft",
	website: "https://hypersoft.de",
	description: "Hypersoft is a provider of POS systems designed for restaurants and cafés.",
	icon: "Hypersoft.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "hypersoft:header:0",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("\\.myhypersoftapp\\.de", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
