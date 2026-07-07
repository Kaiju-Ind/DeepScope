import type { TechnologyDefinition } from '../../types';

export const sareTechnologyDefinition = {
	id: "sare",
	name: "Sare",
	website: "https://sare.pl",
	description: "Sare is a marketing automation platform that uses targeted email campaigns to strengthen customer relationships and enhance brand loyalty.",
	icon: "Sare.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sare:dom:0",
			kind: "dom",
			selector: "input[id*='SAREforms_email']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
