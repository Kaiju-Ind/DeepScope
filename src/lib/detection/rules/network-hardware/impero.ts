import type { TechnologyDefinition } from '../../types';

export const imperoTechnologyDefinition = {
	id: "impero",
	name: "Impero",
	website: "https://www.imperosoftware.com",
	description: "Impero offers educational and corporate customers the most secure way of remotely accessing devices.",
	icon: "Impero.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "impero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.netop\\.com"),
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
