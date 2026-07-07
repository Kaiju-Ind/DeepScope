import type { TechnologyDefinition } from '../../types';

export const boutiqTechnologyDefinition = {
	id: "boutiq",
	name: "Boutiq",
	website: "https://www.getboutiq.com",
	description: "Boutiq is a personal video shopping solution.",
	icon: "Boutiq.svg",
	categories: [
		"ecommerce-extensions",
		"media-video",
	],
	rules: [
		{
			id: "boutiq:jsGlobal:0",
			kind: "jsGlobal",
			property: "caazamApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
