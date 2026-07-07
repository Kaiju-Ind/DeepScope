import type { TechnologyDefinition } from '../../types';

export const fastcommerceTechnologyDefinition = {
	id: "fastcommerce",
	name: "Fastcommerce",
	website: "https://www.fastcommerce.com.br",
	description: "Fastcommerce is an ecommerce platform that offers tools and solutions for businesses to create and manage online stores in Brazil.",
	icon: "Fastcommerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fastcommerce:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Fastcommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fastcommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^fastcommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
