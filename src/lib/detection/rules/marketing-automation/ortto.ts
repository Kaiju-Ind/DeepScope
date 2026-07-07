import type { TechnologyDefinition } from '../../types';

export const orttoTechnologyDefinition = {
	id: "ortto",
	name: "Ortto",
	website: "https://ortto.com",
	description: "Ortto is a marketing automation and customer data platform that integrates your data, messaging, and analytics into one unified system.",
	icon: "Ortto.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ortto:jsGlobal:0",
			kind: "jsGlobal",
			property: "AP3_WIDGETS_PREFIX",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
