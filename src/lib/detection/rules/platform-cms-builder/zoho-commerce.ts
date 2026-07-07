import type { TechnologyDefinition } from '../../types';

export const zohoCommerceTechnologyDefinition = {
	id: "zoho-commerce",
	name: "Zoho Commerce",
	website: "https://www.zoho.com/commerce/",
	description: "Zoho Commerce is a cloud-based ecommerce platform by Zoho Corporation, facilitating online store creation and management.",
	icon: "Zoho Commerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zoho-commerce:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Zoho Commerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zoho-commerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^zoho commerce", "i"),
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
