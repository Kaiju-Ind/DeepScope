import type { TechnologyDefinition } from '../../types';

export const maidcentralTechnologyDefinition = {
	id: "maidcentral",
	name: "MaidCentral",
	website: "https://maidcentral.com",
	description: "MaidCentral is a software platform for managing cleaning businesses.",
	icon: "MaidCentral.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "maidcentral:dom:0",
			kind: "dom",
			selector: "iframe[src*='.maidcentral.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
