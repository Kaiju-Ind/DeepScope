import type { TechnologyDefinition } from '../../types';

export const dzbuildTechnologyDefinition = {
	id: "dzbuild",
	name: "DZBuild",
	website: "https://dzbuild.com",
	description: "DZBuild is a data-driven marketing system that analyzes customer data to support campaign management, audience segmentation, and performance measurement across digital channels.",
	icon: "DZBuild.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "dzbuild:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^DZBuild$", "i"),
			description: "Meta tag matches a known technology marker.",
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
