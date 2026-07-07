import type { TechnologyDefinition } from '../../types';

export const weaverseTechnologyDefinition = {
	id: "weaverse",
	name: "Weaverse",
	website: "https://weaverse.io",
	description: "Weaverse is a theme customizer and headless CMS for Shopify Hydrogen.",
	icon: "Weaverse.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "weaverse:jsGlobal:0",
			kind: "jsGlobal",
			property: "__weaverses",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
