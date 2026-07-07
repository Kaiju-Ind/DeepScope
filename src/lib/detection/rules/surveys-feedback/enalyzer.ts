import type { TechnologyDefinition } from '../../types';

export const enalyzerTechnologyDefinition = {
	id: "enalyzer",
	name: "Enalyzer",
	website: "https://www.enalyzer.com",
	description: "Enalyzer is an online survey creation platform.",
	icon: "Enalyzer.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "enalyzer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("surveys\\.enalyzer\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
