import type { TechnologyDefinition } from '../../types';

export const benchTechnologyDefinition = {
	id: "bench",
	name: "Bench",
	website: "https://benchmedia.com",
	description: "Bench is a provider of omnichannel programmatic media and performance marketing solutions.",
	icon: "Bench.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bench:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.benchplatform\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
