import type { TechnologyDefinition } from '../../types';

export const analyzzTechnologyDefinition = {
	id: "analyzz",
	name: "Analyzz",
	website: "https://analyzz.com",
	description: "Analyzz is a privacy-focused analytics platform that collects and reports website data while minimizing tracking of individual users.",
	icon: "Analyzz.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "analyzz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.analyzz\\.com"),
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
