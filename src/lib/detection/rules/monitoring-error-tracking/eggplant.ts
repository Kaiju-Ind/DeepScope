import type { TechnologyDefinition } from '../../types';

export const eggplantTechnologyDefinition = {
	id: "eggplant",
	name: "Eggplant",
	website: "https://www.eggplantsoftware.com",
	description: "Eggplant is a software testing and monitoring company.",
	icon: "Eggplant.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "eggplant:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.eggplant\\.cloud\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eggplant:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.eggplant\\.cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
