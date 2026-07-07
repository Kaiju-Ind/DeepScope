import type { TechnologyDefinition } from '../../types';

export const winsEcommerceTechnologyDefinition = {
	id: "wins-ecommerce",
	name: "Wins eCommerce",
	website: "https://winsecommerce.com",
	description: "Wins eCommerce is a scalable ecommerce infrastructure that enables online store creation and product sales.",
	icon: "WinseCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wins-ecommerce:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Wins E-commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wins-ecommerce:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^wins e-commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
