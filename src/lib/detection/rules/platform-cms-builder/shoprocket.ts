import type { TechnologyDefinition } from '../../types';

export const shoprocketTechnologyDefinition = {
	id: "shoprocket",
	name: "Shoprocket",
	website: "https://shoprocket.io",
	description: "Shoprocket is a solution that integrates ecommerce functionality into existing websites, enabling businesses to sell products online without requiring a complete site overhaul.",
	icon: "Shoprocket.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoprocket:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shoprocket",
			description: "Page-owned global matches a known technology marker.",
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
