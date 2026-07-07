import type { TechnologyDefinition } from '../../types';

export const querloTechnologyDefinition = {
	id: "querlo",
	name: "Querlo",
	website: "https://www.querlo.com",
	description: "Querlo is a provider of custom artificial intelligence solutions tailored for business applications.",
	icon: "Querlo.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "querlo:dom:0",
			kind: "dom",
			selector: "#querloEmbd",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
