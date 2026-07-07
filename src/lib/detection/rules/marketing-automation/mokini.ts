import type { TechnologyDefinition } from '../../types';

export const mokiniTechnologyDefinition = {
	id: "mokini",
	name: "Mokini",
	website: "https://www.mokini.com",
	description: "Mokini is a marketing automation platform designed for ecommerce businesses with customizable templates, user segmentation, and scheduling.",
	icon: "Mokini.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mokini:jsGlobal:0",
			kind: "jsGlobal",
			property: "mokiniSettings",
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
} as const satisfies TechnologyDefinition;
