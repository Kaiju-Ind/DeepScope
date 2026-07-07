import type { TechnologyDefinition } from '../../types';

export const smartoctoTechnologyDefinition = {
	id: "smartocto",
	name: "Smartocto",
	website: "https://smartocto.com",
	description: "Smartocto is a smart content analytics system.",
	icon: "Smartocto.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "smartocto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smartocto\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
