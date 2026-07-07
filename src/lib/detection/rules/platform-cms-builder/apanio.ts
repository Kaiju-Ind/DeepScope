import type { TechnologyDefinition } from '../../types';

export const apanioTechnologyDefinition = {
	id: "apanio",
	name: "Apanio",
	website: "https://apanio.com",
	description: "Apanio is a website platform that provides integrated ecommerce features, including a shopping cart, shipping tools, and payment processing, enabling users to create and manage online stores.",
	icon: "Apanio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "apanio:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Apanio$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "apanio:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^apanio$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
