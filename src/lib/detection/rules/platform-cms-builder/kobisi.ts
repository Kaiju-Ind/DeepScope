import type { TechnologyDefinition } from '../../types';

export const kobisiTechnologyDefinition = {
	id: "kobisi",
	name: "Kobisi",
	website: "https://www.kobisi.com",
	description: "Kobisi is a Turkish ecommerce platform that provides tools for creating, managing, and operating online stores.",
	icon: "Kobisi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kobisi:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("kobisi\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
