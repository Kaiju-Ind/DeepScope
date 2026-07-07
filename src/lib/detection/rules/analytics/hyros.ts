import type { TechnologyDefinition } from '../../types';

export const hyrosTechnologyDefinition = {
	id: "hyros",
	name: "Hyros",
	website: "https://hyros.com",
	description: "Hyros is a marketing analytics and optimisation platform.",
	icon: "Hyros.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "hyros:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/v1\\/lst\\/universal-script\\?ph\\="),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
