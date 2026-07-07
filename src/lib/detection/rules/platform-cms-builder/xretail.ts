import type { TechnologyDefinition } from '../../types';

export const xretailTechnologyDefinition = {
	id: "xretail",
	name: "Xretail",
	website: "https://xretail.com",
	description: "Xretail is a subscription based product that enables the omni-channel ecommerce approach to its customers.",
	icon: "Xretail.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "xretail:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Xretail team$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xretail:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^xretail team$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
