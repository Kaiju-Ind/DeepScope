import type { TechnologyDefinition } from '../../types';

export const analyzatiTechnologyDefinition = {
	id: "analyzati",
	name: "Analyzati",
	website: "https://analyzati.com",
	description: "Analyzati is a privacy-focused analytics tool that measures website performance while protecting user data.",
	icon: "Analyzati.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "analyzati:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.analyzati\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
