import type { TechnologyDefinition } from '../../types';

export const calensoTechnologyDefinition = {
	id: "calenso",
	name: "Calenso",
	website: "https://calenso.com",
	description: "Calenso is an online enterprise scheduling solution that helps companies in consulting-intensive industries organize appointments.",
	icon: "Calenso.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "calenso:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.calenso\\.com\\/"),
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
