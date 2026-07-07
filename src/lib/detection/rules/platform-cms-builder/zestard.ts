import type { TechnologyDefinition } from '../../types';

export const zestardTechnologyDefinition = {
	id: "zestard",
	name: "Zestard",
	website: "https://www.zestardshop.com",
	description: "Zestard is a provider of Shopify plugins, offering solutions that support ecommerce functionality and customization.",
	icon: "Zestard.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zestard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zestardshop\\.com\\/shopifyapp"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zestard:jsGlobal:1",
			kind: "jsGlobal",
			property: "$zestard_easy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
