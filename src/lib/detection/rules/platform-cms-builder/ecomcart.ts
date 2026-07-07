import type { TechnologyDefinition } from '../../types';

export const ecomcartTechnologyDefinition = {
	id: "ecomcart",
	name: "EcomCart",
	website: "https://ecomcart.eu",
	description: "EcomCart is a platform that enables the creation and management of an online store for selling products and services.",
	icon: "EcomCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecomcart:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("EcomCart\\.eu", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ecomcart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ecomcart\\.eu", "i"),
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
