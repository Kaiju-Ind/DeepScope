import type { TechnologyDefinition } from '../../types';

export const shoprollerTechnologyDefinition = {
	id: "shoproller",
	name: "Shoproller",
	website: "https://www.shoproller.ee",
	description: "Shoproller is a website builder that offers integrated ecommerce features, enabling users to create and manage online stores.",
	icon: "ShopRoller.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoproller:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ShopRoller\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shoproller:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("shoproller\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
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
