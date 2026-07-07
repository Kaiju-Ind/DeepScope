import type { TechnologyDefinition } from '../../types';

export const leveradeTechnologyDefinition = {
	id: "leverade",
	name: "LEVERADE",
	website: "https://leverade.com",
	description: "LEVERADE is a sports management and monetization system designed to organize, track, and optimize sporting events and related financial operations.",
	icon: "LEVERADE.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "leverade:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.leverade\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
