import type { TechnologyDefinition } from '../../types';

export const reviewforestTechnologyDefinition = {
	id: "reviewforest",
	name: "ReviewForest",
	website: "https://reviewforest.org/",
	description: "ReviewForest is a service that facilitates the collection of product reviews, contributing to environmental efforts.",
	icon: "ReviewForest.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewforest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reviewforest\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
