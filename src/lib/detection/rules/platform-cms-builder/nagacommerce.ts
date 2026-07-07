import type { TechnologyDefinition } from '../../types';

export const nagacommerceTechnologyDefinition = {
	id: "nagacommerce",
	name: "NagaCommerce",
	website: "https://www.nagacommerce.com",
	description: "NagaCommerce is an ecommerce platform provided as a service.",
	icon: "NagaCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nagacommerce:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^NagaCommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nagacommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^nagacommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
